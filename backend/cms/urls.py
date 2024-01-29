from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('customer', views.customerAPI),
    path('customer/<int:id>', views.customerAPI),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)