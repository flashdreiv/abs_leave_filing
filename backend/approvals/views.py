from django.shortcuts import render
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ApprovalSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import Approval
from accounts.models import UserAccount


# Create your views here.


class ApprovalView(APIView):
    serializer_class = ApprovalSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, pk, format=None):
        data = self.request.data
        try:
            filing = Filing.objects.get(id=pk)
            queryset = Approval.objects.get(
                filing=filing, approver=request.user.email, status="1"
            )
            queryset.status = data["approved"]
            queryset.filing.status = data["approved"]

            if queryset.status == "2":
                # Check daytype to decrement leave credits
                if queryset.filing.day_type == "3":
                    queryset.filing.leave_type.leave_credits = F("leave_credits") - 1
                    try:
                        if queryset.level == 0:
                            Approval.objects.create(
                                filing=filing, level=1, approver="drei@gmail.com"
                            )
                            print("shit test")
                        elif queryset.level == 1:
                            Approval.objects.create(
                                filing=filing, level=2, approver="drei@gmail.com"
                            )
                    except BaseException as e:
                        print(e)
                else:
                    queryset.filing.leave_type.leave_credits = F("leave_credits") - 0.5
                    try:
                        if queryset.level == 0:
                            Approval.objects.create(
                                filing=filing, level=1, approver="drei@gmail.com"
                            )
                            print("shit test")
                        elif queryset.level == 1:
                            Approval.objects.create(
                                filing=filing, level=2, approver="drei@gmail.com"
                            )
                    except BaseException as e:
                        print(e)
            queryset.remarks = data["remarks"]
            queryset.filing.leave_type.save()
            queryset.filing.save()
            queryset.save()
            approval = ApprovalSerializer(queryset.data)
            return Response({"success": "Successfully approved"})
        except BaseException as e:
            return Response({"error": "Approval Error"})


class ListApprovalView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = ApprovalSerializer

    def get(self, request):
        user = request.user
        queryset = Approval.objects.filter(approver=user.email)
        approvals = ApprovalSerializer(queryset, many=True)
        return Response(approvals.data)


class ApproveLeaveByIdView(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request, pk):
        user = request.user
        remarks = self.request.data["remarks"]

        queryset = Approval.objects.get(approver=user, pk=pk, status="1")
        approver_email = UserAccount.objects.get(
            groups__name="Human Resource Manager"
        ).email
        # Check if employee
        if queryset.level == 0:
            queryset.status = 2
            Approval.objects.create(
                filing=queryset.filing, approver=approver_email, level=1
            )
        # Check if department head or HR officer
        elif queryset.level == 1:
            queryset.status = 2
            approver_email = UserAccount.objects.get(
                groups__name="Top Management"
            ).email
            Approval.objects.create(
                filing=queryset.filing, approver=approver_email, level=2
            )
        elif queryset.level == 2:
            queryset.status = 2
            # Decrement user leave  credits
            if queryset.filing.day_type == "3":
                queryset.filing.leave_type.leave_credits -= 1
            else:
                queryset.filing.leave_type.leave_credits - 0.5
        queryset.filing.leave_type.save()
        queryset.remarks = remarks
        queryset.save()
        return Response({"success": "Approve successful"})
