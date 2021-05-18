from django.urls import path, include, re_path
from .views import (
    UpdateFilingView,
    LeaveTypeView,
    ListFilingView,
    AddFilingView,
    DeleteFilingView,
)

urlpatterns = [
    path("", ListFilingView.as_view(), name="list-filing"),
    path("add", AddFilingView.as_view(), name="add-filing"),
    path("delete/<int:pk>", DeleteFilingView.as_view(), name="delete-filing"),
    path("update/<int:pk>", UpdateFilingView.as_view(), name="list-filing"),
    path("leaves/", LeaveTypeView.as_view(), name="list-leave-types"),
]
