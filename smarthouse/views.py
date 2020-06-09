from django.shortcuts import render
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.core import serializers
from django.db.models import F
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Q
import json
from django.apps import apps
from django import template

register = template.Library()

@register.filter
def get_obj_attr(obj, attr):
    return getattr(obj, attr)


def index(request):
    return HttpResponse("Hello world")