# Generated by Django 3.2 on 2021-05-02 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filings', '0019_auto_20210502_1553'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leavetype',
            name='leave_credits',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]
