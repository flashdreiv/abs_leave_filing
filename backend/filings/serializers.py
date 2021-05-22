from rest_framework import serializers, fields
from .models import Filing, LeaveType

from approvals.models import Approval


class FilingSerializer(serializers.ModelSerializer):
    leave_type = serializers.StringRelatedField()
    day_type = serializers.CharField(source="get_day_type_display")
    user = serializers.StringRelatedField()
    approval = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="status",
    )

    class Meta:
        model = Filing
        fields = [
            "id",
            "user",
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
