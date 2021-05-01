from rest_framework import serializers, fields
from .models import Filing


class FilingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filing
        fields = [
            "id",
            "leave_type",
            "day_type",
            "leave_date_from",
            "leave_date_to",
            "remarks",
            "status",
        ]

    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)
    #     rep["leave_type"] = FilingSerializer(instance.leave_type).data
    #     return rep
