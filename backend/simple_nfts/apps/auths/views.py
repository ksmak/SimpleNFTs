from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from web3 import Web3

from abstracts.mixins import ResponseMixin, ErrorMixin

from .serializers import UserSerializer


User = get_user_model()


class UserViewSet(ViewSet, ResponseMixin, ErrorMixin):
    """
        ViewSet for user model
    """

    permission_classes = (IsAuthenticated, )

    @action(methods=('GET', ), detail=False)
    def get_by_address(self, request):
        address = request.query_params['address']

        if not address:
            return self.get_json_error(
                'No address',
                status.HTTP_400_BAD_REQUEST
            )
        user = User.objects.filter(wallet__public_address=address).first()

        if not user:
            return self.get_json_error(
                'User not found',
                status.HTTP_400_BAD_REQUEST
            )

        serializer = UserSerializer(user)

        return self.get_json_response(serializer.data)

    @action(methods=('GET', ), detail=False)
    def get_self(self, request):
        serializer = UserSerializer(request.user)

        return self.get_json_response(serializer.data)

    @action(methods=('POST', ), detail=False)
    def update_self(self, request, pk=None):
        obj = get_object_or_404(User, id=request.user.id)

        serializer = UserSerializer(obj, data=request.data)

        if not serializer.is_valid():
            return self.get_json_error(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return self.get_json_response('Success update')
