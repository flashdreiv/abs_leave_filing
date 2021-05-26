from rest_framework import serializers, fields
from .models import Filing, LeaveType

from approvals.models import Approval


class ApprovalListingField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            "status": value.status,
            "approver": value.approver,
            "remarks": value.remarks,
        }


class FilingSerializer(serializers.ModelSerializer):
    leave_type = serializers.StringRelatedField()
    day_type = serializers.CharField(source="get_day_type_display")
    approval = ApprovalListingField(read_only=True, many=True)

    class Meta:
        model = Filing
        fields = [
            "id",
            "leave_type",
            "day_type",
            "leave_date_from",
            "leave_date_to",
            "remarks",
            "approval",
        ]


class LeaveTypeSerializer(serializers.ModelSerializer):
    leave_type = serializers.CharField(source="get_leave_type_display")

    class Meta:
        model = LeaveType
        fields = ["id", "leave_type", "leave_credits"]
