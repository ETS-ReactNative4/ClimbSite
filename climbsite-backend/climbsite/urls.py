from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls.static import static

from climbers.views import ChangePasswordView, UpdateProfileView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/climbers/', include('climbers.urls')),
    path('api/crags/', include('crags.urls')),
    path('api/events/', include('events.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change_password/<int:pk>/', ChangePasswordView.as_view()),
    path('update_profile/<int:pk>/', UpdateProfileView.as_view()),
] 

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
