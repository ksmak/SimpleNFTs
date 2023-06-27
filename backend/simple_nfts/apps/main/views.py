from django.conf import settings

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework import status

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


class ArtViewSet(ModelViewSet):
    """
        View set for Art(NFTs)
    """
    queryset = Art.objects.all()
    serializer_class = ArtSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = (IsAuthenticated, )
    pagination_class = CustomNumberPagination


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

        return self.get_json_response('success')
