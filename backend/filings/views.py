from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FilingSerializer, LeaveTypeSerializer
from accounts.models import UserAccount
from .models import Filing, LeaveType
from rest_framework.response import Response
from rest_framework import status

# Create your views here.


class FilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        try:
            user = UserAccount.objects.get(pk=int(request.user.id))
            queryset = Filing.objects.filter(user=user)
            filings = FilingSerializer(queryset, many=True)
        except BaseException as e:
            return Response({"error": e})

        return Response(filings.data)

    def post(self, request):
        data = self.request.data

        user_id = int(request.user.id)
        leave_type = data["leave_type"]
        day_type = data["day_type"]
        leave_date_from = data["leave_date_from"]
        leave_date_to = data["leave_date_to"]
        remarks = data["remarks"]

        try:
            user = UserAccount.objects.get(pk=user_id)
            leave_type = LeaveType.objects.get(user=user, pk=leave_type)
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
                    {"error": "You don't have sufficient leave credits fro that type"}
                )
            else:
                print(day_type)
                if day_type == 1 or day_type == 2:
                    leave_type.leave_credits -= 0.5
                    print(day_type)

                elif day_type == 3:
                    leave_type.leave_credits -= 1

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