from rest_framework import serializers, fields
from .models import Approval
from filings.serializers import FilingSerializer


class ApprovalSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")
    filing = FilingSerializer(read_only=True)

    class Meta:
        model = Approval
        fields = ["approver", "status", "remarks", "filing"]
