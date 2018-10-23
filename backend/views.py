from django.shortcuts import render

# Create your views here.


def link_index(request):
    return render(request, 'index.html')
