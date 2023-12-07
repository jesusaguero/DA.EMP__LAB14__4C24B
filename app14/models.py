from django.db import models


class Empleado(models.Model):
    nombre = models.CharField(max_length=255)
    categoria = models.CharField(max_length=1, choices=[('A', 'A'), ('B', 'B'), ('C', 'C')])
    horas_trabajadas = models.PositiveIntegerField()
    pago = models.FloatField(null=True, blank=True)
