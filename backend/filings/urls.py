from django.urls import path, include, re_path
from .views import (
    FilingView,
    LeaveTypeView,
    ApprovalView,
    ListFilingView,
    AddFilingView,
)

urlpatterns = [
    path("", ListFilingView.as_view(), name="list-filing"),
    path("add", AddFilingView.as_view(), name="add-filing"),
    path("<int:pk>", FilingView.as_view(), name="list-filing"),
    path("leaves/", LeaveTypeView.as_view(), name="list-leave-types"),
    path("approvals/<int:pk>", ApprovalView.as_view(), name="approve-leave"),
]
