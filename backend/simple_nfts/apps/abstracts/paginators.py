from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class CustomNumberPagination(PageNumberPagination):
    """
        Custom number paginator class
    """
    page_size = 1000
    page_size_query_param = 'page_size'
    page_query_param = 'page'
    max_page_size = 10000

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'results': data
        })
