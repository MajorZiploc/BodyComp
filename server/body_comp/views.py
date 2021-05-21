from django.shortcuts import render
from django.views import generic
from .models import Day, WeightUnit
from django.utils import timezone


class IndexView(generic.ListView):
  template_name = 'body_comp/index.html'
  context_object_name = 'day_list'

  def get_queryset(self):
    """
    """
    return Day.objects.filter(
        day_date__lte=timezone.now()
    ).order_by('-day_date')[:]


class DetailView(generic.DetailView):
  model = Day
  template_name = 'body_comp/detail.html'
