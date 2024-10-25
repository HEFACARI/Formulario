#Este archivo ayuda hacer el CRUD

from django.urls import path, include
from rest_framework import routers
from .views import FormsView, FormulariosViews, PreguntasViews

router = routers.DefaultRouter()
router.register(r'forms', FormsView, 'forms')
router.register(r'formularios', FormulariosViews, 'formularios')
router.register(r'preguntas', PreguntasViews, 'preguntas')

urlpatterns = [
    path("api/v1/", include(router.urls))    
]