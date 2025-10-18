







from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Car, Rental
from .serializer import CarSerializer, RentalSerializer







#List all cars 
class CarList(APIView):
    def get(self, request):
        cars = Car.objects.all()
        serializer = CarSerializer(cars, many=True)
        return Response({"cars": serializer.data})

    def post(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Car added successfully"})
        return Response(serializer.errors)

 Retrieve, Update, Delete a specific car
class CarDetail(APIView):
    def get(self, request, car_id):
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"error": "Car not found"})
        serializer = CarSerializer(car)
        return Response(serializer.data)

    def put(self, request, car_id):
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"error": "Car not found"})
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "Car updated successfully"})
        return Response(serializer.errors)

    def delete(self, request, car_id):
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"error": "Car not found"})
        car.delete()
        return Response({"msg": "Car deleted successfully"})


#  Rent a car
class RentCar(APIView):
    def post(self, request, car_id):
        try:
            car = Car.objects.get(id=car_id)
        except Car.DoesNotExist:
            return Response({"error": "Car not found"})

        if not car.available:
            return Response({"error": "Car already rented"})

        serializer = RentalSerializer(data=request.data)
        if serializer.is_valid():
            rental = Rental.objects.create(
                car=car,
                user_name=serializer.validated_data["user_name"],
                start_date=serializer.validated_data["start_date"],
                end_date=serializer.validated_data["end_date"]
            )
            car.available = False
            car.save()
            return Response({"msg": "Car rented successfully"})
        return Response(serializer.errors)


#  Return (Cancel) rental
class ReturnCar(APIView):
    def post(self, request, rental_id):
        try:
            rental = Rental.objects.get(id=rental_id)
        except Rental.DoesNotExist:
            return Response({"error": "Rental not found"})

        rental.car.available = True
        rental.car.save()
        rental.delete()
        return Response({"msg": "Car returned successfully"})
    








class cancel_rental(APIView):

    def delete(self, request, id):
        rental = Rental.objects.filter(id=id).first()
        if not rental:
            return Response({"error": "Rental not found"}, status=status.HTTP_404_NOT_FOUND)

        
        rental.car.available = True
        rental.car.save()

       
        rental.delete()

        return Response({"msg": "Car returned successfully"})
    


class rental_list(APIView):
    def get(self, request):
        rentals = Rental.objects.all()
        serializer = RentalSerializer(rentals, many=True)
        return Response({"rentals": serializer.data})
