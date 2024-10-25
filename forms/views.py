#Este archivo crea una vista 

from rest_framework import viewsets
from .serializer import FormsSerializer, FormulariosSerializer, PreguntasSerializer
from .models import Forms, Formularios, Preguntas

# Create your views here.

class FormsView(viewsets.ModelViewSet):
    serializer_class = FormsSerializer
    queryset = Forms.objects.all()
    
class FormulariosViews(viewsets.ModelViewSet):
    serializer_class = FormulariosSerializer
    queryset = Formularios.objects.all()

class PreguntasViews(viewsets.ModelViewSet):
    serializer_class = PreguntasSerializer
    queryset = Preguntas.objects.all()