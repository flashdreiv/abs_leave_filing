# Generated by Django 3.2 on 2021-05-15 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0010_auto_20210515_2046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='department_head',
            field=models.EmailField(choices=[(1, 'admin@aljaybiosciences.com'), (5, 'drei@gmail.com'), (24, 'joke@gmail.com'), (25, 'marie@gmail.com')], max_length=150),
        ),
    ]
