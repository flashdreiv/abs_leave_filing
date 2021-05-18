from rest_framework import serializers, fields


class ApprovalSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source="get_status_display")

    class Meta:
        model = Approval
        fields = "__all__"
