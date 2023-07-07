from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import SimpleRouter

from rest_framework_simplejwt.views import TokenRefreshView

from auths.views import UserViewSet
from main.views import ArtViewSet

router = SimpleRouter()

router.register(r'users', UserViewSet, basename='users')
router.register(r'arts', ArtViewSet, basename='arts')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('metamask/', include('metaMaskAuth.urls')),
    path('api/', include(router.urls)),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    urlpatterns += [
        path('__debug__/', include('debug_toolbar.urls')),
    ]
