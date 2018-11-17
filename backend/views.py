from django.shortcuts import render

# Create your views here.


def link_index(request):
    return render(request, 'index.html')


def link_home(requset):
    return render(requset, 'home.html')


def link_sd_index(request):
    return render(request, 'sd_index.html')
