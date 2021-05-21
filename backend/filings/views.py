from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FilingSerializer, LeaveTypeSerializer
from accounts.models import UserAccount
from .models import Filing, LeaveType
from approvals.models import Approval
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Q

# Create your views here.


class ListFilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = UserAccount.objects.get(pk=int(request.user.id))
            group = request.user.groups.all()[0].name
            queryset = None
            if group == "Employee":
                queryset = Filing.objects.filter(user=user)
            elif group == "Middle Manager" or group == "Human Resource":
                try:
                    # Get all filing from the user and the user being the approver
                    queryset = Filing.objects.filter(
                        Q(approval__approver=user.email) | Q(user=user),
                        status="1",
                    )
                except:
                    return Response({"error": "No data found"})
            filings = FilingSerializer(queryset, many=True)
        except BaseException as e:
            return Response({"error": e})
        return Response(filings.data)


class AddFilingView(APIView):
    def post(self, request):
        data = self.request.data

        user = request.user
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
            leave_type = LeaveType.objects.get(user=user)
            Filing.objects.create(
                user=user,
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
            leave_type.save()
            return Response({"success": "Leave filing creation created"})
        except BaseException as e:

            return Response(
                {"error": "Failed creating leave filing, overlapping date existed"}
            )


class DeleteFilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk, format=None):
        try:
            user_id = int(request.user.id)
            filing = Filing.objects.get(user__id=user_id, pk=pk)
            filing.delete()
            return Response({"Success": "delete success"})
        except BaseException as e:
            return Response({"error": "Delete Failed"})


class UpdateFilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

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
            filing.leave_type = leave_type
            filing.day_type = data["day_type"]
            filing.leave_date_from = data["leave_date_from"]
            filing.leave_date_to = data["leave_date_to"]
            filing.remarks = data["remarks"]
            filing.save()
            return Response({"success": "Update successful"})

        except BaseException as e:
            return Response({"error": "Update were not successful"})


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
