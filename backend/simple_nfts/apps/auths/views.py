from django.contrib.auth import get_user_model

from rest_framework.viewsets import ViewSet
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from .serializers import (
    UserSerializer,
)

from abstracts.mixins import ResponseMixin, ErrorMixin


User = get_user_model()


class UserViewSet(ViewSet, ResponseMixin, ErrorMixin):
    """
        ViewSet for user model
    """

    @action(
        methods=['GET'],
        detail=False,
        permission_classes=[IsAuthenticated]
    )
    def get_self(self, request):
        serializer = UserSerializer(request.user)
        return self.get_json_response(serializer.data)

    @action(
        methods=['POST'],
        detail=False,
        permission_classes=[IsAuthenticated]
    )
    def update_self(self, request, pk=None):
        obj = None

        try:
            obj = User.objects.get(id=request.user.id)

        except Exception as e:
            print(f"ERROR: {e}")
            return None

        if not obj:
            return self.get_json_error(
                'User not found.',
                status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(obj, data=request.data)

        if not serializer.is_valid():
            return self.get_json_error(
                serializer.errors,
                status.HTTP_400_BAD_REQUEST
            )

        serializer.save()

        return self.get_json_response('Success update')
