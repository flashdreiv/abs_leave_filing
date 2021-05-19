from django.urls import path
from .views import ListApprovalView, ApproveLeaveByIdView

urlpatterns = [
    path("", ListApprovalView.as_view(), name="list-approvals"),
    path("<int:pk>", ApproveLeaveByIdView.as_view(), name="approve-leave"),
]
