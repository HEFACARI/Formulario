#Este archivo permite seleccionar los campos que quiero de la tabla  

from rest_framework import serializers
from .models import Forms, Formularios, Preguntas

class FormsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Forms
        #fields = ('id', 'firstName', 'lastName', 'done')
        fields = '__all__'
        
class FormulariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formularios
        fields = '__all__'
        
class PreguntasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Preguntas
        fields = '__all__'