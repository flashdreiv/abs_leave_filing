from django.contrib import admin
from .models import Filing, LeaveType


class FilingAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "leave_type",
        "day_type",
    ]


class LeaveTypeAdmin(admin.ModelAdmin):
    list_display = ["user", "leave_type", "leave_credits"]
    list_editable = ("leave_type",)


# Register your models here.
admin.site.register(Filing, FilingAdmin)
admin.site.register(LeaveType, LeaveTypeAdmin)
