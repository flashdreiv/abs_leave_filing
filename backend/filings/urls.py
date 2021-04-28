from django.urls import path, include, re_path
from .views import FilingView

urlpatterns = [
    path("", FilingView.as_view(), name="list-filing"),
]
