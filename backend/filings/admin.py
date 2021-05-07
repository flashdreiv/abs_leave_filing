from django.contrib import admin
from .models import Filing, LeaveType, Approval


class ApprovalAdmin(admin.ModelAdmin):
    list_display = ["filing", "level", "approver", "status"]
    list_editable = ("status",)


class LeaveTypeAdmin(admin.ModelAdmin):
    list_display = ["user", "leave_type", "leave_credits"]
    list_editable = ("leave_type",)


# Register your models here.
admin.site.register(Filing)
admin.site.register(LeaveType, LeaveTypeAdmin)
admin.site.register(Approval, ApprovalAdmin)
