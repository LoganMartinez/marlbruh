from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from bookclub import models, serializers
from rest_framework import status
from ebooklib import epub
from rest_framework.parsers import MultiPartParser, FormParser
from bs4 import BeautifulSoup
import io
from django.core.files.images import ImageFile
from django.shortcuts import get_object_or_404
import json


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
        createdBook = models.Book.objects.create(title=title, coverImage=coverImage)
        coverImage.close()
        ncx = book.get_item_with_id("ncx")
        ncxsoup = BeautifulSoup(ncx.get_content(), "lxml")
        chNo = 0
        for ch in ncxsoup.find_all("navpoint"):
            src = ch.content["src"]
            chapter = book.get_item_with_href(src)
            chapterSoup = BeautifulSoup(chapter.get_content(), "html.parser")
            models.Chapter.objects.create(
                book=createdBook, content=chapterSoup.get_text(), chapterNumber=chNo
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


class TargetChapterView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, bookId, chapterNumber):
        chapter = get_object_or_404(
            models.Chapter, book__id=bookId, chapterNumber=chapterNumber
        )
        responseChapter = serializers.ChapterSerializer(chapter)
        return Response(responseChapter.data)


class BookclubCommentsView(APIView):
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