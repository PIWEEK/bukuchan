from django.contrib import admin

from .models import Project, Node, ProjectNode, TextNode, Scene, LoreEntity, NodeGroup, NodeGroupChild, Settings


admin.site.register(Project)
admin.site.register(Node)
admin.site.register(ProjectNode)
admin.site.register(TextNode)
admin.site.register(Scene)
admin.site.register(LoreEntity)
admin.site.register(NodeGroup)
admin.site.register(NodeGroupChild)
admin.site.register(Settings)
