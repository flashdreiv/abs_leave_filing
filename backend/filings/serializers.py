from rest_framework import serializers, fields
from .models import Filing


class FilingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filing
        fields = [
            "leave_type",
            "day_type",
            "leave_date_from",
            "leave_date_to",
            "remarks",
        ]
