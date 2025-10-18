

from django.db import models

class Car(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    daily_rate = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.make} {self.model} ({self.year})"


class Rental(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    user_name = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    rental_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user_name} rented {self.car}"







