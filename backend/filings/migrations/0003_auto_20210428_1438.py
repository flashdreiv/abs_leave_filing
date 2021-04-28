# Generated by Django 3.2 on 2021-04-28 06:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('filings', '0002_auto_20210428_1429'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filing',
            name='leave_type',
        ),
        migrations.CreateModel(
            name='LeaveCredits',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('leave_credits', models.IntegerField(default=0)),
                ('leave_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='filings.leavetype')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='filing',
            name='leave_credits',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='filings.leavecredits'),
        ),
    ]