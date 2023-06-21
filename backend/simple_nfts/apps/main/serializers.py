from rest_framework import serializers

from .models import Art


class ArtSerializer(serializers.ModelSerializer):
    """
        Art serializer.
    """
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Art
        fields = ['status', 'uri', 'owner', 'title',
                  'price', 'image', 'date_of_creation']


class BuyArtSerializer(serializers.Serializer):
    """
        Serializer for buying Art(NFT object)
    """
    buyer = serializers.CharField()
    tokenId = serializers.IntegerField()
    markup = serializers.IntegerField()
