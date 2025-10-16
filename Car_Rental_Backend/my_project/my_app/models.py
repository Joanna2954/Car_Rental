

# POST /cars/ → Add a new car to the system.
# GET /cars/ → Retrieve all available cars.
# GET /cars/{car_id} → Retrieve details of a specific car.
# POST /cars/{car_id}/rent → Rent a car for a specified period.
# DELETE /rentals/{rental_id} → Cancel an active rental.









# from django.db import models


# class Car(models.Model):
  
#     make = models.CharField(max_length=100)                      
#     model = models.CharField(max_length=100)                     
#     year = models.PositiveIntegerField()                         
#     daily_rate = models.DecimalField(                            
#         max_digits=10,
#         decimal_places=2
#     )
#     available = models.BooleanField(default=True)               

#     def __str__(self):
#         return f"{self.make} {self.model} ({self.year})"


# class Rental(models.Model):
    
#     car = models.ForeignKey(                                   
#         Car,
#         on_delete=models.CASCADE,
#         related_name='rentals'
#     )
#     user_name = models.CharField(max_length=100)                 
#     start_date = models.DateTimeField()                          
#     end_date = models.DateTimeField()                            
#     rental_date = models.DateTimeField(auto_now_add=True)       

#     def __str__(self):
#         return f"{self.user_name} - {self.car.make} {self.car.model}"







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







