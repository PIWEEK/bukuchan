from django.urls import path
from .views import ProjectsListView, ProjectsDetailView, NodesListView, NodeDetailView, NodeSetChildView
from rest_framework.authtoken import views

urlpatterns = [
    path('auth', views.obtain_auth_token),
    path('projects', ProjectsListView.as_view(), name='projects-list'),
    path('projects/<int:pk>', ProjectsDetailView.as_view(), name='projects-detail'),
    path('projects/<int:pk>/nodes', NodesListView.as_view(), name='nodes-list'),
    path('projects/<int:pk>/nodes/<int:node_pk>', NodeDetailView.as_view(), name='node-detail'),
    path('projects/<int:pk>/nodes/<int:node_pk>/set-child', NodeSetChildView.as_view(), name='node-detail'),
]

