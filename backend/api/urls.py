from django.urls import path
from .views import ProfileView, ProjectsListView, ProjectsDetailView, NodesListView, NodeDetailView, NodeSetChildView, ProjectSetChildView, NodeAnalysisView
from rest_framework.authtoken import views

urlpatterns = [
    path('auth', views.obtain_auth_token),
    path('profile', ProfileView.as_view()),
    path('projects', ProjectsListView.as_view()),
    path('projects/<int:pk>', ProjectsDetailView.as_view()),
    path('projects/<int:pk>/set-child', ProjectSetChildView.as_view()),
    path('projects/<int:pk>/nodes', NodesListView.as_view()),
    path('projects/<int:pk>/nodes/<int:node_pk>', NodeDetailView.as_view()),
    path('projects/<int:pk>/nodes/<int:node_pk>/analysis', NodeAnalysisView.as_view()),
    path('projects/<int:pk>/nodes/<int:node_pk>/set-child', NodeSetChildView.as_view()),
]

