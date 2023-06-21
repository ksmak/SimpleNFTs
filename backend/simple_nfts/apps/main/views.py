from django.conf import settings

from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser

from abstracts.mixins import (
    ResponseMixin,
    ErrorMixin
)
from abstracts.paginators import CustomNumberPagination
from abstracts.services import ArtHelper

from .serializers import ArtSerializer


art_helper = ArtHelper(
    network=settings.ETH_NETWORK,
    account_address=settings.ETH_ACCOUNT_ADDRESS,
    private_key=settings.ETH_PRIVATE_KEY,
    contract_file=settings.ETH_CONTRACT_FILE,
    contract_address=settings.ETH_CONTRACT_ADDRESS
)


class ArtViewSet(ViewSet, ResponseMixin, ErrorMixin):
    """
        View set for Art(NFTs)
    """
    permission_classes = [IsAuthenticated]
    pagination_class = CustomNumberPagination
    queryset = art_helper.get_all_nft()

    def list(self, request):
        serializer = ArtSerializer(data=self.queryset, many=True)

        if not serializer.is_valid():
            return self.get_json_error(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )

        paginator = self.pagination_class()
        paginator.paginate_queryset(self.queryset, request)
        return self.get_json_response(serializer.data)

    def retrieve(self, request, pk=None):
        obj = self.get_object(self.queryset, pk)

        if not obj:
            return self.get_json_error(
                'NFT not found.',
                status.HTTP_404_NOT_FOUND
            )

        serializer = ArtSerializer(obj)

        return self.get_json_response(serializer.data)

    @action(
        detail=False,
        methods=['POST'],
        parser_classes=[MultiPartParser]
    )
    def create_art(self, request):
        serializer = ArtSerializer(data=request.data)

        if not serializer.is_valid():
            return self.get_json_error(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )

        receipt = art_helper.create_nft(**serializer.data)

        if receipt['status'] != 1:
            return self.get_json_response(
                f'Transaction failed: {receipt["transactionHash"].hex()}',
                status.HTTP_400_BAD_REQUEST
            )

        return self.get_json_response('Success created.')

    @action(detail=False, methods=['POST'])
    def buy_nft(self, request):
        serializer = ArtSerializer(data=self.request.data)

        if not serializer.is_valid():
            return self.get_json_error(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )

        receipt = art_helper.buy_nft(**serializer.data)

        if receipt['status'] != 1:
            return self.get_json_error(
                f'Transaction failed: {receipt["transactionHash"].hex()}',
                status.HTTP_400_BAD_REQUEST
            )

        return self.get_json_response('Success updated.')
