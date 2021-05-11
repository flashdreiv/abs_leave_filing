from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FilingSerializer, LeaveTypeSerializer, ApprovalSerializer
from accounts.models import UserAccount
from .models import Filing, LeaveType, Approval
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
            if user.is_superuser:
                queryset = Filing.objects.filter(
                    approval__approver=user.email, status="1"
                )
            elif group == "Middle Manager":
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


class FilingView(APIView):
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
            approval = ApprovalSerializer(queryset)
            return Response({"success": "Successfully approved"})
        except BaseException as e:
            return Response({"error": "Approval Error"})

        return Response(approval.data)
