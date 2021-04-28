from rest_framework import serializers
from .models import Filing


class FilingSerializer(serializers.ModelSerializer):
    leave_type = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Filing
        fields = [
            "leave_type",
            "day_type",
            "leave_date_from",
            "leave_date_to",
            "remarks",
        ]
