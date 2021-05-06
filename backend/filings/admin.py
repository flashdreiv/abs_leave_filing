from django.contrib import admin
from .models import Filing, LeaveType, Approval


class ApprovalAdmin(admin.ModelAdmin):
    list_display = ["filing", "level", "approver", "status"]
    list_editable = ("status",)


# Register your models here.
admin.site.register(Filing)
admin.site.register(LeaveType)
admin.site.register(Approval, ApprovalAdmin)
