# Generated by Django 3.2 on 2021-06-05 06:41

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('filings', '0037_auto_20210605_1419'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='filing',
            unique_together={('leave_type', 'user'), ('leave_date_from', 'user'), ('leave_date_to', 'user')},
        ),
    ]
