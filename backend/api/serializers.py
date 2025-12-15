from rest_framework import serializers
from .models import Project, Scene, LoreEntity, Node, Scene, LoreEntity, NodeGroup, NodeGroupChild

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

class ProjectNodeSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return NodeSerializer(instance=instance.node).data

class ProjectBasicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('id', 'title', 'description')

class ProjectDetailSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner', 'projectnode']


class NodeSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        print(instance.as_child().__class__)
        node = instance.as_child()
        
        if isinstance(node, Scene):
            data = SceneSerializer(instance=node).data
        elif isinstance(node, LoreEntity):
            data = LoreEntitySerializer(instance=node).data
        elif isinstance(node, NodeGroup):
            data = NodeGroupSerializer(instance=node).data
        else:
            data = {}

        data['type'] = node.get_node_type()

        return data

class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = '__all__'

class LoreEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = '__all__'

class NodeGroupChildSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return NodeSerializer(instance.child).data
    
class NodeGroupSerializer(serializers.ModelSerializer):
    # node_group_parent = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    children = NodeGroupChildSerializer(many=True, source='node_group_parent')

    class Meta:
        model = NodeGroup
        fields = '__all__'
    
