from django.urls import path

from . import views

app_name = 'body_comp'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('day_create', views.day_create_view, name='day_create')
]
