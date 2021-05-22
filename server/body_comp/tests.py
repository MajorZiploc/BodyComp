from django.test import TestCase
from django.urls import reverse
from .models import Day, WeightUnit
from django.utils import timezone
import datetime


def create_weight_units():
  return WeightUnit.objects.create(name='Pounds', label='lbs')


def create_day(days):
  time = timezone.now() + datetime.timedelta(days=days)
  w = WeightUnit.objects.get(name='Pounds')
  print(f'{w} weight things')
  return w.day_set.create(day_date=time)


class DayIndexViewTests(TestCase):
  def test_no_days(self):
    """
    If no days exist, an appropriate message is displayed.
    """
    response = self.client.get(reverse('body_comp:index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, "No days are available.")
    self.assertQuerysetEqual(response.context['day_list'], [])

  def test_shows_day(self):
    """
    Shows day
    """
    create_weight_units()
    day1 = create_day(days=-30)
    response = self.client.get(reverse('body_comp:index'))
    self.assertEqual(response.status_code, 200)
    self.assertNotContains(response, "No days are available.")
    self.assertQuerysetEqual(response.context['day_list'], [day1])
