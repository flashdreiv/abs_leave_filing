# Generated by Django 3.2 on 2021-05-08 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filings', '0032_remove_filing_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='filing',
            name='status',
            field=models.CharField(choices=[('1', 'Pending'), ('2', 'Approve'), ('3', 'Rejected')], default='1', max_length=50),
        ),
    ]