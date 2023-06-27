from rest_framework.pagination import PageNumberPagination


class CustomNumberPagination(PageNumberPagination):
    """
        Custom number paginator class
    """
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 10000
