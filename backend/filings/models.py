from django.db import models
from accounts.models import UserAccount
from multiselectfield import MultiSelectField

# Create your models here.


class LeaveType(models.Model):
    leave_type = models.CharField(max_length=100)


class Filing(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    date_filed = models.DateTimeField(auto_now_add=True)
    leave_date = models.DateTimeField()
    leave_type = models.ForeignKey(LeaveType, on_delete=models.CASCADE)
