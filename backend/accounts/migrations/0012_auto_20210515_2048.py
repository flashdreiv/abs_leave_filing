# Generated by Django 3.2 on 2021-05-15 20:48

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_alter_department_department_head'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='department_head',
            field=models.EmailField(choices=[('admin@aljaybiosciences.com', 'admin@aljaybiosciences.com'), ('drei@gmail.com', 'drei@gmail.com'), ('joke@gmail.com', 'joke@gmail.com'), ('marie@gmail.com', 'marie@gmail.com')], max_length=150),
        ),
        migrations.AlterField(
            model_name='department',
            name='staff',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
