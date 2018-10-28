from django.shortcuts import render

# Create your views here.


def link_index(request):
    return render(request, 'pages_index.html')


def link_tempBlogHome(request):
    return render(request, 'temp_bloghome.html')


def link_tempBlogPost(request):
    return render(request, 'temp_blogpost.html')
