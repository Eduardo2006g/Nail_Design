from django.contrib import admin
from .models import User, Service, Appointment, PortfolioImage, Product, PromoCode

admin.site.register(User)
admin.site.register(Service)
admin.site.register(Appointment)
admin.site.register(PortfolioImage)
admin.site.register(Product)
admin.site.register(PromoCode)
