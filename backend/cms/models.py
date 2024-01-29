from django.db import models

# Create your models here.
class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=250)
    email = models.EmailField(max_length=100)
    phone_no = models.CharField(max_length=100)
    address = models.CharField(max_length=250)


    def __str__(self):
        return self.name
