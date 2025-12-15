from django.urls import path
from .views import ProjectsListView, ProjectsDetailView

urlpatterns = [
    path('projects/', ProjectsListView.as_view(), name='projects-list'),
    path('projects/<int:pk>', ProjectsDetailView.as_view(), name='projects-detail'),
]

