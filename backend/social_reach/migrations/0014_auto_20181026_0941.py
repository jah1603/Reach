# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-10-26 09:41
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social_reach', '0013_merge_20181026_0941'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2018, 10, 26, 9, 41, 30, 445852)),
        ),
    ]
