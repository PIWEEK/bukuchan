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

    def as_child(self):
        if hasattr(self, "nodegroup"):
            return self.nodegroup
        if hasattr(self, "textnode"):
            if hasattr(self.textnode, "scene"):
                return self.textnode.scene
            if hasattr(self.textnode, "loreentity"):
                return self.textnode.loreentity
        return self

    def get_node_type(self):
        if hasattr(self, "nodegroup"):
            return "node-group"
        if hasattr(self, "textnode"):
            if hasattr(self.textnode, "scene"):
                return "scene"
            if hasattr(self.textnode, "loreentity"):
                return "lore-entity"
        return self

class ProjectNode(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    node = models.ForeignKey(Node, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)

# Base class for text nodes
class TextNode(Node):
    text = models.TextField()

class Scene(TextNode):
    pass

class LoreEntity(TextNode):
    entity_name = models.CharField(max_length=255)

class NodeGroup(Node):
    pass

class NodeGroupChild(models.Model):
    group = models.ForeignKey(NodeGroup, on_delete=models.CASCADE, related_name='node_group_parent')
    child = models.ForeignKey(Node, on_delete=models.CASCADE)
    order = models.IntegerField(default=0)
    
class Settings(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)

    default_font_family = models.CharField(max_length=255)
    default_font_size = models.CharField(max_length=255)
    default_line_height = models.CharField(max_length=255)

    h1_font_family = models.CharField(max_length=255, blank=True)
    h1_font_size = models.CharField(max_length=255, blank=True)
