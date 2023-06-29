from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
        Serializer for user model
    """
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'full_name']
