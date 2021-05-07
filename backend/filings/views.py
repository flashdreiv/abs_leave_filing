from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FilingSerializer, LeaveTypeSerializer, ApprovalSerializer
from accounts.models import UserAccount
from .models import Filing, LeaveType, Approval
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F

# Create your views here.


class FilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = UserAccount.objects.get(pk=int(request.user.id))
            if user.is_superuser:
                queryset = Filing.objects.filter(
                    approval__approver=user.email, status="1"
                )
            else:
                queryset = Filing.objects.filter(user=user)
            filings = FilingSerializer(queryset, many=True)
        except BaseException as e:
            return Response({"error": e})

        return Response(filings.data)

    def put(self, request, pk, format=None):
        data = self.request.data

        try:

            user_id = int(request.user.id)
            leave_type = data["leave_type"]

            filing = Filing.objects.get(pk=pk, user__id=user_id)
            for leave, leaveString in enumerate(LeaveType.leave_type_choices):
                if leaveString[1] == leave_type:
                    leave_type = leaveString[0]
            leave_type = LeaveType.objects.get(user__id=user_id, leave_type=leave_type)
            if filing.status == "1":
                filing.leave_type = leave_type
                filing.day_type = data["day_type"]
                filing.leave_date_from = data["leave_date_from"]
                filing.leave_date_to = data["leave_date_to"]
                filing.remarks = data["remarks"]
                filing.save()
                return Response({"success": "Update successful"})
            else:
                return Response({"error": "Filing Can't be updated"})

        except BaseException as e:
            return Response({"error": e})

    def delete(self, request, pk, format=None):
        try:
            user_id = int(request.user.id)
            filing = Filing.objects.get(user__id=user_id, pk=pk)
            # if filing.status == "1":
            #     if filing.day_type == "1" or filing.day_type == "2":
            #         filing.leave_type.leave_credits = F("leave_credits") + 0.5
            #     elif filing.day_type == "3":
            #         filing.leave_type.leave_credits = F("leave_credits") + 1
            #     filing.leave_type.save()
            filing.delete()
            return Response({"Success": "delete success"})
        except BaseException as e:
            return Response({"error": e})

    def post(self, request):
        data = self.request.data

        user_id = int(request.user.id)
        leave_type = data["leave_type"]
        day_type = data["day_type"]
        leave_date_from = data["leave_date_from"]
        leave_date_to = data["leave_date_to"]
        remarks = data["remarks"]

        try:
            for leave, leaveString in enumerate(LeaveType.leave_type_choices):
                if leaveString[1] == leave_type:
                    leave_type = leaveString[0]
                else:
                    leave_type = LeaveType.leave_type_choices[0][0]
            leave_type = LeaveType.objects.get(user__id=user_id, leave_type=leave_type)
            Filing.objects.create(
                user=request.user,
                leave_type=leave_type,
                day_type=day_type,
                remarks=remarks,
                leave_date_from=leave_date_from,
                leave_date_to=leave_date_to,
            )
            if leave_type.leave_credits < 1:
                return Response(
                    {"error": "You don't have sufficient leave credits for that type"}
                )
            # else:
            #     if day_type == 1 or day_type == 2:
            #         leave_type.leave_credits = F("leave_credits") - 0.5

            #     elif day_type == 3:
            #         leave_type.leave_credits = F("leave_credits") - 1

            leave_type.save()
            return Response({"success": "Leave filing creation created"})
        except BaseException as e:
            print(e)
            return Response({"error": "Failed creating leave filing"})


class LeaveTypeView(APIView):
    serializer_class = LeaveTypeSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = UserAccount.objects.get(pk=int(request.user.id))
            queryset = LeaveType.objects.filter(user=user)
            leaveType = LeaveTypeSerializer(queryset, many=True)
        except BaseException as e:
            return Response({"error": e})

        return Response(leaveType.data)


class ApprovalView(APIView):
    serializer_class = ApprovalSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):

        try:

            print(filing)

            queryset = Approval.objects.filter(approver=request.user.email, status="1")
            approvals = ApprovalSerializer(queryset, many=True)
        except BaseException as e:
            return Response({"error": e})

        return Response(approvals.data)
