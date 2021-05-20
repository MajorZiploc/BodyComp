from django.db import models

class WeightUnits(models.Model):
    name = models.CharField(max_length=250)
    label = models.CharField(max_length=100)

    def __str__(self):
            return self.name

class Day(models.Model):
    weight_units = models.ForeignKey(WeightUnits, on_delete=models.CASCADE)
    calories = models.IntegerField(default=0)
    morning_weight = models.FloatField(default=0.0)
    body_fat_percentage = models.FloatField(default=0.0)
    muscle_mass_percentage = models.FloatField(default=0.0)
    day_date = models.DateField()

    def __str__(self):
            return f'{self.day_date} {self.calories}'
