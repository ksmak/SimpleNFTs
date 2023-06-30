from django.conf import settings

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import (
    FormParser,
    MultiPartParser,
    JSONParser
)
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import action

from abstracts.paginators import CustomNumberPagination
from abstracts.services import ArtSerivce
from abstracts.mixins import ErrorMixin, ResponseMixin

from .models import Art
from .serializers import ArtSerializer

art_service = ArtSerivce(
    network=settings.ETH_NETWORK,
    account_address=settings.ETH_ACCOUNT_ADDRESS,
    private_key=settings.ETH_PRIVATE_KEY,
    contract_file=settings.ETH_CONTRACT_FILE,
    contract_address=settings.ETH_CONTRACT_ADDRESS
)


class ArtViewSet(ModelViewSet, ResponseMixin, ErrorMixin):
    """
        View set for Art(NFTs)
    """
    queryset = Art.objects.all()
    serializer_class = ArtSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (IsAuthenticated, )
    pagination_class = CustomNumberPagination

    @action(methods=('DELETE', ), detail=False)
    def delete_by_image(self, request):
        image_uri = request.data.get('image_uri')

        if not image_uri:
            return self.get_json_error(
                'No parameter',
                status.HTTP_400_BAD_REQUEST
            )

        art = Art.objects.filter(image__contains=image_uri).first()

        if not art:
            return self.get_json_error(
                'Art not found',
                status.HTTP_400_BAD_REQUEST
            )

        art.delete()

        return self.get_json_response(
            'Art is deleted.'
        )


class BuyArtView(APIView, ErrorMixin, ResponseMixin):
    """
        View for buy art
    """
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        error, receipt = art_service.buy_art(**request.data)

        if error:
            return self.get_json_error(
                str(error), status.HTTP_400_BAD_REQUEST)

        return self.get_json_response(receipt)
