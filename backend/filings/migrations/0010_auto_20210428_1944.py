# Generated by Django 3.2 on 2021-04-28 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filings', '0009_auto_20210428_1936'),
    ]

    operations = [
        migrations.AlterField(
            model_name='filing',
            name='leave_date_from',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='filing',
            name='leave_date_to',
            field=models.DateField(),
        ),
    ]