from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from bookclub import models, serializers
from rest_framework import status
from ebooklib import epub, ITEM_STYLE
from rest_framework.parsers import MultiPartParser, FormParser
from bs4 import BeautifulSoup
import io
from django.core.files.images import ImageFile
from django.shortcuts import get_object_or_404
import json
from datetime import datetime
import pytz


class BookView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get(self, request):
        books = models.Book.objects.all()
        responseSerializer = serializers.BookSerializer(books, many=True)
        return Response(responseSerializer.data)

    def post(self, request):
        serializer = serializers.PostBookSerializer(data=request.FILES)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        with open("/tmp/marlbruhbook.epub", "wb") as file:
            file.write(serializer.validated_data["bookfile"].read())
        book = epub.read_epub("/tmp/marlbruhbook.epub", {"ignore_ncx": False})
        title = book.get_metadata("DC", "title")[0][0]
        coverImageBytes = book.get_item_with_id("cover-image")
        coverImage = ImageFile(
            io.BytesIO(coverImageBytes.get_content()), name="book-cover-image.jpg"
        )
        styles = book.get_items_of_type(ITEM_STYLE)
        css = b"\n".join([style.get_content() for style in styles]).decode("utf-8")
        createdBook = models.Book.objects.create(
            title=title, coverImage=coverImage, cssStyles=css
        )
        coverImage.close()
        ncx = book.get_item_with_id("ncx")
        ncxsoup = BeautifulSoup(ncx.get_content(), "lxml")
        chNo = 0
        for ch in ncxsoup.find_all("navpoint"):
            src = ch.content["src"]
            chapter = book.get_item_with_href(src)
            chapterHtml = (
                chapter.get_content().split(b"<body>")[-1].split(b"</body>")[0]
            ).decode("utf-8")
            models.Chapter.objects.create(
                book=createdBook, content=chapterHtml, chapterNumber=chNo
            )
            chNo = chNo + 1
        responseBook = serializers.BookSerializer(createdBook)
        return Response(responseBook.data)


class TargetBookView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, bookId):
        book = get_object_or_404(models.Book, pk=bookId)
        responseBook = serializers.BookSerializer(book)
        chapters = models.Chapter.objects.filter(book__id=bookId)
        return Response({**responseBook.data, "numChapters": len(chapters)})

    def delete(self, request, bookId):
        book = get_object_or_404(models.Book, id=bookId)
        book.delete()
        return Response(status=status.HTTP_200_OK)


# temporary view for migration from plaintext books to html books
# should be deleted after migration
class MigrateHtml(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def put(self, request, bookId):
        serializer = serializers.PostBookSerializer(data=request.FILES)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        with open("/tmp/marlbruhbook.epub", "wb") as file:
            file.write(serializer.validated_data["bookfile"].read())
        book = epub.read_epub("/tmp/marlbruhbook.epub", {"ignore_ncx": False})
        styles = book.get_items_of_type(ITEM_STYLE)
        css = b"\n".join([style.get_content() for style in styles]).decode("utf-8")
        oldbook = get_object_or_404(models.Book, pk=bookId)
        oldbook.cssStyles = css
        ncx = book.get_item_with_id("ncx")
        ncxsoup = BeautifulSoup(ncx.get_content(), "lxml")
        chNo = 0
        for ch in ncxsoup.find_all("navpoint"):
            src = ch.content["src"]
            chapter = book.get_item_with_href(src)
            chapterHtml = (
                chapter.get_content().split(b"<body>")[-1].split(b"</body>")[0]
            ).decode("utf-8")
            oldChapter = get_object_or_404(
                models.Chapter, book__id=bookId, chapterNumber=chNo
            )
            oldChapter.content = chapterHtml
            oldChapter.save()
            chNo = chNo + 1
        oldbook.save()
        responseBook = serializers.BookSerializer(oldbook)
        return Response(responseBook.data)


class TargetChapterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, bookId, chapterNumber):
        chapter = get_object_or_404(
            models.Chapter, book__id=bookId, chapterNumber=chapterNumber
        )
        responseChapter = serializers.ChapterSerializer(chapter)
        return Response(responseChapter.data)


class BookclubChapterCommentsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, bookId, chapterNumber):
        serializer = serializers.PostBookclubCommentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)

        chapter = get_object_or_404(
            models.Chapter, book__id=bookId, chapterNumber=chapterNumber
        )
        highlightedStr = json.dumps(serializer.validated_data["highlighted"])
        bookclubComment = models.BookclubComment.objects.create(
            passage=serializer.validated_data["passage"],
            comment=serializer.validated_data["comment"],
            highlighted=highlightedStr,
            author=request.user,
            book=chapter.book,
            chapter=chapter,
        )

        responseComment = serializers.BookclubCommentSerializer(bookclubComment)

        return Response(responseComment.data)

    def get(self, request, bookId, chapterNumber):
        comments = models.BookclubComment.objects.filter(
            book__id=bookId, chapter__chapterNumber=chapterNumber
        )

        responseComments = serializers.BookclubCommentSerializer(comments, many=True)
        return Response(responseComments.data)


class LikeBookclubCommentView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, commentId):
        comment = get_object_or_404(models.BookclubComment, pk=commentId)
        if request.user in comment.likes.all():
            comment.likes.remove(request.user)
        else:
            comment.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)


class LikeBookclubReplyView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, replyId):
        reply = get_object_or_404(models.BookclubReply, pk=replyId)
        if request.user in reply.likes.all():
            reply.likes.remove(request.user)
        else:
            reply.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)


class BookclubRepliesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, commentId):
        replies = models.BookclubReply.objects.filter(originalPost__id=commentId)
        responseReplies = serializers.BookclubReplySerializer(replies, many=True)
        return Response(data=responseReplies.data)

    def post(self, request, commentId):
        serializer = serializers.PostBookclubReplySerializer(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        comment = get_object_or_404(models.BookclubComment, id=commentId)
        reply = models.BookclubReply.objects.create(
            originalPost=comment,
            content=serializer.validated_data["content"],
            author=request.user,
            datePosted=datetime.now().replace(tzinfo=pytz.timezone("US/Central")),
        )
        responseReply = serializers.BookclubReplySerializer(reply)
        return Response(responseReply.data)


class BookclubUserRelationView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, bookId):
        book = get_object_or_404(models.Book, id=bookId)
        relation, created = models.BookUserRelation.objects.get_or_create(
            book=book, user=request.user
        )
        responseRelation = serializers.BookclubUserRelationSerializer(relation)
        resStatus = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(responseRelation.data, status=resStatus)

    def put(self, request, bookId):
        serializer = serializers.PutBookclubUserRelationSerialzier(data=request.data)
        if not serializer.is_valid():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        relation = get_object_or_404(
            models.BookUserRelation, user=request.user, book__id=bookId
        )
        relation.lastChapterComplete = serializer.validated_data["lastChapterComplete"]
        relation.save()
        responseRelation = serializers.BookclubUserRelationSerializer(relation)
        return Response(responseRelation.data)


class BookclubCommentsView(APIView):
    permission_classes = [IsAuthenticated]
    # should maybe refactor the post to happen here instead of chapter view

    def get(
        self,
        request,
        bookId,
    ):
        comments = models.BookclubComment.objects.filter(book__id=bookId)

        responseComments = serializers.BookclubCommentSerializer(comments, many=True)
        return Response(responseComments.data)
