# Generated by Django 3.2 on 2021-05-18 21:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0013_rename_department_department_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='department',
            name='department_head',
            field=models.EmailField(choices=[('admin@aljaybiosciences.com', 'admin@aljaybiosciences.com'), ('drei@gmail.com', 'drei@gmail.com'), ('joke@gmail.com', 'joke@gmail.com'), ('marie@gmail.com', 'marie@gmail.com'), ('test@gmail.com', 'test@gmail.com')], max_length=150),
        ),
    ]
