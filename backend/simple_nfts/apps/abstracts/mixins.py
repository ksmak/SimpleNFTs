from rest_framework.response import Response


class ResponseMixin:
    """
        Response mixin
    """

    def get_json_response(self, data, paginator=None):
        if paginator:
            return paginator.get_paginated_response(data)

        return Response({'result': data})


class ErrorMixin:
    """
        Error response mixin
    """

    def get_json_error(self, error_message, status):
        return Response({
            'error': error_message
        },
            status=status
        )
