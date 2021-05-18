from rest_framework import serializers, fields
from .models import Filing, LeaveType


class FilingSerializer(serializers.ModelSerializer):
    leave_type = serializers.StringRelatedField()
    day_type = serializers.CharField(source="get_day_type_display")
    status = serializers.CharField(source="get_status_display")
    user = serializers.StringRelatedField()

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
            "status",
        ]


class LeaveTypeSerializer(serializers.ModelSerializer):
    leave_type = serializers.CharField(source="get_leave_type_display")

    class Meta:
        model = LeaveType
        fields = ["id", "leave_type", "leave_credits"]
