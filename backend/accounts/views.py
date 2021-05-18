from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from .models import Department, UserAccount
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import (
    MyTokenObtainPairSerializer,
    DepartmentSerializer,
    UserListSerializer,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

User = get_user_model()

# Create your views here.


class ObtainTokenPairWithUserTypeView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


class SignUpView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = self.request.data

        email = data["email"]
        password = data["password"]
        password2 = data["password2"]

        if password == password2:
            if User.objects.filter(email=email).exists():
                return Response({"error": "Email already exists"})
            else:
                if len(password) < 6:
                    return Response({"error": "Email already exists"})
                else:
                    user = User.objects.create_user(email=email, password=password)
                    my_group = Group.objects.get(name="Employee")
                    user.groups.add(my_group)
                    user.save()
                    return Response({"success": "User created successfully"})
        else:
            return Response({"error": "Password does not match"})


class DepartmentListView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = DepartmentSerializer

    def get(self, request, format=None):
        queryset = Department.objects.all()
        departments = DepartmentSerializer(queryset, many=True)
        return Response(departments.data)


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ListAllUsers(APIView):
    permission_classes = (IsAdminUser,)
    serializer_class = UserListSerializer

    def get(self, request):
        try:
            user_list = UserAccount.objects.filter(is_superuser=False)
            users = UserListSerializer(user_list, many=True)
            return Response(users.data)
        except:
            return Response({"error": "No users found"})
