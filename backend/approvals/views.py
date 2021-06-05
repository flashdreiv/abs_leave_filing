from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ApprovalSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Approval
from accounts.models import UserAccount
from django.db.models import F


# Create your views here.


class ListApprovalView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ApprovalSerializer

    def get(self, request):
        user = request.user
        queryset = Approval.objects.filter(approver=user.email).order_by("-id")
        approvals = ApprovalSerializer(queryset, many=True)
        return Response(approvals.data)


class ApproveLeaveByIdView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        user = request.user
        remarks = self.request.data["remarks"]
        decision = self.request.data["decision"]

        queryset = Approval.objects.get(approver=user, pk=pk, status="1")
        approver_email = UserAccount.objects.get(
            groups__name="Human Resource Manager"
        ).email

        queryset.status = decision
        # Check if Rejected
        if decision == "3":
            queryset.filing.leave_type.save()
            queryset.remarks = remarks
            queryset.save()
            return Response({"success": "Reject successful"})
        # Check if employee
        if queryset.level == 0:
            Approval.objects.create(
                filing=queryset.filing, approver=approver_email, level=1
            )
        # Check if department head or HR officer
        elif queryset.level == 1:
            approver_email = UserAccount.objects.get(
                groups__name="Top Management"
            ).email
            Approval.objects.create(
                filing=queryset.filing, approver=approver_email, level=2
            )
        elif queryset.level == 2:
            # Decrement user leave  credits
            if queryset.filing.day_type == "3":
                queryset.filing.leave_type.leave_credits = F("leave_credits") - 1
            else:
                queryset.filing.leave_type.leave_credits = F("leave_credits") - 0.5
        queryset.filing.leave_type.save()
        queryset.remarks = remarks
        queryset.save()
        return Response({"success": "Approve successful"})
