

from django.urls import path
from .views import CarList, CarDetail, RentCar, ReturnCar, cancel_rental, rental_list

urlpatterns = [
    path('cars/', CarList.as_view(), name='car_list'),
    path('cars/<int:car_id>/', CarDetail.as_view(), name='car_detail'),
    path('cars/<int:car_id>/rent/', RentCar.as_view(), name='rent_car'),
    path('rentals/<int:rental_id>/return/', ReturnCar.as_view(), name='return_car'), 
    path('cancel/<int:id>/', cancel_rental.as_view(), name='cancel_rental'),
    path('rentals/', rental_list.as_view(), name='rental-list'),
]

