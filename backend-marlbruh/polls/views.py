from django.http import HttpResponse, Http404
from .models import Question

def index(request):
    latest_question_list = Question.objects.order_by("-pub_date")[:5]
    output = ", ".join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

def detail(request, question_id):
    try:
      # can alternatively use get_object_or_404 (get_list_or_404 to use filter instead of get)
      question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
      raise Http404("Question does not exist")
    return HttpResponse(f"Question {question.id}: {question.question_text}")

def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)



