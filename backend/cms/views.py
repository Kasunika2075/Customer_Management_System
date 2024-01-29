from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .models import Customer
from .serializers import CustomerSerializer
from django.core.files.storage import default_storage

@csrf_exempt
def customerAPI(request, id=0):
    if request.method == 'GET':
        customers = Customer.objects.all()
        customers_serializer = CustomerSerializer(customers, many=True)
        return JsonResponse(customers_serializer.data, safe=False)
    
    
    elif request.method == 'DELETE':
        customers = Customer.objects.get(id=id)
        customers.delete()
        return JsonResponse("Deleted Successfully!!" , safe=False)    
