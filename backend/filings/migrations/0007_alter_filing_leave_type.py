# Generated by Django 3.2 on 2021-04-28 19:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('filings', '0006_alter_leavetype_leave_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filing',
            name='leave_type',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='filings.leavetype'),
        ),
    ]