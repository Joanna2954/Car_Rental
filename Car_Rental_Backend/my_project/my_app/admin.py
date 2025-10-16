from django.contrib import admin
from .models import Car, Rental  # ✅ import your models first

# Register your models here.
admin.site.register(Car)
admin.site.register(Rental)
