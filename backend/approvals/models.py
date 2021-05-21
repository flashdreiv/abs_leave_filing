from django.db import models
from django.apps import apps

status_choice = (("1", "Pending"), ("2", "Approve"), ("3", "Rejected"))
# Create your models here.
class Approval(models.Model):
    filing = models.ForeignKey(
        "filings.Filing",
        related_name="approval",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    level = models.SmallIntegerField(default=0)
    approver = models.EmailField(null=True, blank=True)
    status = models.CharField(choices=status_choice, max_length=10, default="1")
    remarks = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.filing.user.email