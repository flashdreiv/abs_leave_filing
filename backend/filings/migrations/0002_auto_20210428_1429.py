# Generated by Django 3.2 on 2021-04-28 06:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filings', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='filing',
            name='leave_date',
        ),
        migrations.AddField(
            model_name='filing',
            name='day_type',
            field=models.CharField(choices=[(1, 'First Half'), (2, 'Second Half'), (3, 'Whole day')], default=3, max_length=50),
        ),
        migrations.AddField(
            model_name='filing',
            name='leave_date_from',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='filing',
            name='leave_date_to',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]