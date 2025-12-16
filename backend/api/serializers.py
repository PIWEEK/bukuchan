from rest_framework import serializers
from .models import Project, Scene, LoreEntity, Node, Scene, LoreEntity, NodeGroup, NodeGroupChild

class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

class ProjectNodeSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        data = NodeSerializer(instance=instance.node).data
        data['order'] = instance.order
        return data

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

    def get_serializer(self, data):
        if data['type'] == 'scene':
            return SceneSerializer(data=data)

        elif data['type'] == 'nodegroup':
            return NodeGroupSerializer(data=data)

        elif data['type'] == 'loreentity':
            return LoreEntitySerializer(data=data)

        else:
            raise serializers.ValidationError({
                'type': 'Type is not valid'
            })

class SceneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scene
        fields = '__all__'

class LoreEntitySerializer(serializers.ModelSerializer):
    class Meta:
        model = LoreEntity
        fields = '__all__'

class NodeGroupChildSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        data = NodeSerializer(instance.child).data
        data['order'] = instance.order
        return data
    
class NodeGroupSerializer(serializers.ModelSerializer):
    children = NodeGroupChildSerializer(many=True, source='node_group_parent', read_only=True)

    class Meta:
        model = NodeGroup
        fields = '__all__'
    
class ReparentSerializer(serializers.Serializer):
    node = serializers.IntegerField()
    order = serializers.IntegerField()
