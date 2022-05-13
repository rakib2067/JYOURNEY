from django.contrib import admin

from .models import Post, Comment


class PostAdmin(admin.ModelAdmin):
    list_display=('title','route','poster','post_date')
    search_fields=('poster','title')


    filter_horizontal=()
    list_filter=()
    fieldsets=()

admin.site.register(Post,PostAdmin)
admin.site.register(Comment)
