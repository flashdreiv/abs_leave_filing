from django.urls import path
from .views import SignUpView, LogoutView, DepartmentListView, ListAllUsers

urlpatterns = [
    path("signup", SignUpView.as_view(), name="signup"),
    path("logout", LogoutView.as_view(), name="logout"),
    path("users", ListAllUsers.as_view(), name="list-users"),
    path("department", DepartmentListView.as_view(), name="list-department"),
]
