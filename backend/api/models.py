from django.contrib.auth.models import User
from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Node(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class ProjectNode(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    node = models.ForeignKey(Node, on_delete=models.CASCADE) 

class TextNode(Node):
    text = models.TextField()

class Scene(Node):
    pass

class LoreEntity(Node):
    entity_name = models.CharField(max_length=255)

class NodeGroup(Node):
    pass

class NodeGroupChild(models.Model):
    group = models.ForeignKey(NodeGroup, on_delete=models.CASCADE, related_name='node_group_parent')
    child = models.ForeignKey(Node, on_delete=models.CASCADE) 
    
class Settings(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    default_font_family = models.CharField(max_length=255)
    default_font_size = models.CharField(max_length=255)
    default_line_height = models.CharField(max_length=255)

    h1_font_family = models.CharField(max_length=255, blank=True)
    h1_font_size = models.CharField(max_length=255, blank=True)
