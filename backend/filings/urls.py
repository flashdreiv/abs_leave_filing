from django.urls import path, include, re_path
from .views import FilingView, LeaveTypeView, ApprovalView

urlpatterns = [
    path("", FilingView.as_view(), name="list-filing"),
    path("<int:pk>", FilingView.as_view(), name="list-filing"),
    path("leaves/", LeaveTypeView.as_view(), name="list-leave-types"),
    path("approvals/", ApprovalView.as_view(), name="list-approvals"),
]
