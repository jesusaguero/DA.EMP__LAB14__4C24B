# views.py
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Empleado


@csrf_exempt
def ingresar_empleado(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        categoria_mapping = {'A': 30, 'B': 20, 'C': 10}
        categoria = data['categoria']

        if categoria not in categoria_mapping:
            return JsonResponse({'error': 'Invalid categoria value'})

        horas_trabajadas = data['horas_trabajadas']
        pago = categoria_mapping[categoria] * horas_trabajadas

        empleado = Empleado.objects.create(
            nombre=data['nombre'],
            categoria=categoria,
            horas_trabajadas=horas_trabajadas,
            pago=pago,
        )

        return JsonResponse({'pago': pago})
    else:
        return JsonResponse({'error': 'Invalid request method'})
