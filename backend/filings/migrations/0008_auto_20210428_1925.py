# Generated by Django 3.2 on 2021-04-28 19:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('filings', '0007_alter_filing_leave_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filing',
            name='leave_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='filings.leavetype'),
        ),
        migrations.AlterField(
            model_name='filing',
            name='user',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]