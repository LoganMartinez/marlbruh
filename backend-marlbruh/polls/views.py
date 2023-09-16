from django.http import HttpResponse, Http404, HttpResponseRedirect
from .models import Choice, Question
from django.urls import reverse
from django.shortcuts import get_object_or_404
import json


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
    question = get_object_or_404(Question, pk=question_id)
    choices = [f"{choice.choice_text}: {choice.votes}" 
               for choice in question.choice_set.all()]
    response = {
        "question": question.question_text, 
        "choices": choices
    }
    return HttpResponse(json.dumps(response))

# this example doesn't work bc I don't feel like making the form that allows you to select a choice
# forms will be made on front end anyway
def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
       selected_choice = question.choice_set.get(pk=request.POST["choice"])
    except (KeyError, Choice.DoesNotExist):
       return HttpResponse("You didn't select a choice")
    else:
       selected_choice.votes += 1
       selected_choice.save()
       # always use redirect after successful post
       return HttpResponseRedirect(reverse("polls:results", args=(question.id,)))



