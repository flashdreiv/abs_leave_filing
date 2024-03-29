from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.generic import TemplateView
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts.views import ObtainTokenPairWithUserTypeView


urlpatterns = [
    path("api-auth/", include("rest_framework.urls")),
    path(
        "api/auth/login",
        ObtainTokenPairWithUserTypeView.as_view(),
        name="token_obtain_pair",
    ),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/accounts/", include("accounts.urls")),
    path("api/filings/", include("filings.urls")),
    path("api/approvals/", include("approvals.urls")),
    path("admin/", admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r"^.*", TemplateView.as_view(template_name="index.html"))]
