from django.contrib import admin
from .models import Approval

# Register your models here.


class ApprovalAdmin(admin.ModelAdmin):
    list_display = ["filing", "level", "approver", "status"]
    list_editable = ("status",)


admin.site.register(Approval, ApprovalAdmin)
