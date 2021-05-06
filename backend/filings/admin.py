from django.contrib import admin
from .models import Filing, LeaveType, Approval

# Register your models here.
admin.site.register(Filing)
admin.site.register(LeaveType)
admin.site.register(Approval)
