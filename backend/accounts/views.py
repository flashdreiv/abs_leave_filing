from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
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
                    user = User.objects.create_user(
                        email=email, password=password
                    )
                    user.save()
                    return Response({"success": "User created successfully"})
        else:
            return Response({"error": "Password does not match"})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self,request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

