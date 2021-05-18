from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from .models import Department, UserAccount


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data["is_superuser"] = self.user.is_superuser
        data["email"] = self.user.email

        return data


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["name"]


class UserListSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)
    department = DepartmentSerializer(many=True, source="department_set")

    class Meta:
        model = UserAccount
        fields = ["id", "email", "groups", "department"]
