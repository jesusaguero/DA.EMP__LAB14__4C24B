from django.urls import path

from .views import ingresar_empleado

urlpatterns = [
    path('ingresar_empleado/', ingresar_empleado, name='ingresar_empleado'),

]
