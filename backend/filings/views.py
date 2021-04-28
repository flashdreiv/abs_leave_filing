from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import FilingSerializer
from accounts.models import UserAccount
from .models import Filing
from rest_framework.response import Response

# Create your views here.


class FilingView(APIView):
    serializer_class = FilingSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = self.request.data

        user = UserAccount.objects.get(pk=1)
        leave_type = data["leave_type"]
        day_type = data["day_type"]
        leave_date_from = data["leave_date_from"]
        leave_date_to = data["leave_date_to"]
        remarks = data["remarks"]

        user = UserAccount.objects.get(pk=1)

        try:
            Filing.objects.create(
                user=user, leave_type=leave_type, day_type=day_type, remarks=remarks
            )
            return Response({"success": "Leave filing creation created"})
        except BaseException as e:
            print(e)
            return Response({"error": "Failed creating leave filing"})
