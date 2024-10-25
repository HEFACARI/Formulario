from django.db import models

# Create your models here.

#Tabla formularios (prueba)
class Forms (models.Model):
    firstName = models.CharField(max_length=50)
    lastName = models.CharField(max_length=50)
    tel = models.CharField(max_length=30)
    email = models.CharField(max_length=50)
    
    def __str__(self):
        return self.firstName
    
#Tabla formularios    
class Formularios(models.Model):
    nombreFormularios = models.CharField(max_length=50)
    
#Tabla preguntas    
class Preguntas(models.Model):
    idFormulario = models.ForeignKey(Formularios, on_delete=models.CASCADE)
    tipoInput = models.CharField(max_length=50)
    #tipoInput = models.IntegerField()
    contenido = models.CharField(max_length=50)