from django.test import TestCase
from django.urls import reverse


class DayIndexViewTests(TestCase):
  def test_no_days(self):
    """
    If no days exist, an appropriate message is displayed.
    """
    response = self.client.get(reverse('body_comp:index'))
    self.assertEqual(response.status_code, 200)
    self.assertContains(response, "No days are available.")
    self.assertQuerysetEqual(response.context['day_list'], [])
