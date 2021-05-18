from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ApprovalSerializer

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
            approval = ApprovalSerializer(queryset)
            return Response({"success": "Successfully approved"})
        except BaseException as e:
            return Response({"error": "Approval Error"})

        return Response(approval.data)
