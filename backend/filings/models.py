from django.db import models
from accounts.models import UserAccount
from multiselectfield import MultiSelectField

# Create your models here.


class LeaveType(models.Model):
    user = models.ForeignKey(
        UserAccount, on_delete=models.CASCADE, null=True, blank=True
    )
    leave_type_choices = (
        ("1", "Work From Home"),
        ("2", "Sick Leave"),
        ("3", "Service Incentive Leave"),
    )
    leave_type = models.CharField(
        choices=leave_type_choices, max_length=250, blank=True, null=True
    )
    leave_credits = models.DecimalField(default=0, max_digits=3, decimal_places=1)

    def __str__(self):
        return self.get_leave_type_display()


class Filing(models.Model):
    day_type_choice = (("1", "First Half"), ("2", "Second Half"), ("3", "Whole day"))
    staus_choice = (("1", "Pending"), ("2", "Approve"), ("3", "Rejected"))
    user = models.ForeignKey(
        UserAccount,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    date_filed = models.DateTimeField(auto_now_add=True)
    leave_date_from = models.DateField(null=True, blank=True, unique=True)
    leave_date_to = models.DateField(null=True, blank=True, unique=True)
    day_type = models.CharField(choices=day_type_choice, max_length=50, default="3")
    leave_type = models.ForeignKey(
        LeaveType, on_delete=models.SET_NULL, null=True, blank=True
    )
    remarks = models.CharField(max_length=300)
    status = models.CharField(choices=staus_choice, max_length=50, default="1")

    def __str__(self):
        return self.user.email
