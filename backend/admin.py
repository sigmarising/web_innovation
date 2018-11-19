from django.contrib import admin

admin.site.site_header = '格莱格莱 诗歌数据'
admin.site.site_title = 'GELAI DATA'

# Register your models here.
from .models import *

admin.site.register(Poet)
admin.site.register(Poetry)
