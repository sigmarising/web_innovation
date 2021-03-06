from django.shortcuts import render
from django.http import JsonResponse
import backend.dba as dal
import json
import logging

logger = logging.getLogger(__name__)


def link_index(request):
    return render(request, 'index.html')


def link_home(requset):
    return render(requset, 'home.html')


def link_sd_index(request):
    return render(request, 'sd_index.html')


def link_sd_dynasty(request):
    return render(request, 'sd_dynasty.html')


def link_sd_poet(request):
    return render(request, 'sd_poet.html')


def link_space_route_visual(request):
    return render(request, 'route_map.html')


def link_network(request):
    return render(request, 'network.html')


def link_onemorething(request):
    return render(request, 'onemorething.html')


def link_one_poem_index(request):
    return render(request, 'one_poem_index.html')


def link_one_poem_inside(request):
    return render(request, 'one_poem_inside.html')


def request_get_poets(request):
    param = request.GET
    return JsonResponse(dal.db_get_poet(param["dynasty"]))


def request_get_poet_intro(request):
    param = request.GET
    return JsonResponse(dal.db_get_intro(param["poetID"]))


def request_get_poetry(request):
    ajax = request.GET
    # print(ajax)
    param = {
        "dynasty": ajax["dynasty"],
        "author": ajax["author"]
    }
    return JsonResponse(dal.db_get_poetry(param))


def request_get_xu_all(request):
    return JsonResponse(dal.db_get_xu_all())


def request_get_xu_inside(request):
    ajax = request.GET
    iid = ajax["id"]
    return JsonResponse(dal.db_get_xu_inside(iid))
