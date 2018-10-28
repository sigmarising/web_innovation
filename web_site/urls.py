"""web_site URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import backend.views as v

urlpatterns = [
    # url for django admin pages
    path('admin/', admin.site.urls),

    # url for index page
    path('', v.link_index),
    path('index', v.link_index),
    path('index.html', v.link_index),

    # url for template
    path('bloghome', v.link_tempBlogHome),
    path('bloghome.html', v.link_tempBlogHome),
    path('blogpost', v.link_tempBlogPost),
    path('blogpost.html', v.link_tempBlogPost),

]