# Generated by Django 3.2 on 2021-04-28 06:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='LeaveType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_type', models.CharField(max_length=100)),
                ('leave_credits', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Filing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_filed', models.DateTimeField(auto_now_add=True)),
                ('leave_date', models.DateTimeField()),
                ('remarks', models.CharField(max_length=300)),
                ('leave_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='filings.leavetype')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
