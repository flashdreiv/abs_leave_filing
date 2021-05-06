from django.db import models
from django.contrib.auth.models import Group
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

# Create your models here.


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("User must have an email address")

        email = self.normalize_email(email)
        user = self.model(email=email)
        group = models.ForeignKey(Group, on_delete=models.SET_NULL)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = UserAccountManager()

    USERNAME_FIELD = "email"

    def __str__(self):
        return self.email


class Department(models.Model):
    user_list = [(user.pk, user.email) for user in UserAccount.objects.all()]
    staff = models.ManyToManyField(UserAccount)
    department = models.CharField(max_length=100)
    department_head = models.CharField(choices=user_list, max_length=150)

    def __str__(self):
        return self.department