from rest_framework import serializers

from .models import Art


class ArtSerializer(serializers.ModelSerializer):
    """
        Art serializer.
    """
    class Meta:
        model = Art
        fields = ('image', )
