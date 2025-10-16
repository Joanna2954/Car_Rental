# from rest_framework import serializers
# from .models import Car, Rental


# class CarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Car
#         fields = "__all__"     
#         depth = 1


# class RentalSerializer(serializers.ModelSerializer):
   

#     class Meta:
#         model = Rental
#         fields = "__all__"    
#         extra_kwargs = {'car': {'read_only': True}} 
#         depth = 1




from rest_framework import serializers
from .models import Car, Rental

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = "__all__"

class RentalSerializer(serializers.ModelSerializer):
    car = CarSerializer(read_only=True)

    class Meta:
        model = Rental
        fields = "__all__"
