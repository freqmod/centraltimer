from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.template import RequestContext, loader
from django.core import serializers
from centraltimer.models import CountdownTarget
from django.conf import settings
from datetime import datetime
from django.utils.safestring import mark_safe
import json

#Should be in util
class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders it's content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = serializers.serialize('json', data, indent = 2)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

#Should be in util
def make_common_info():
    return {"offsetMS": settings.OFFSET_MS, "serverTime": datetime.utcnow().isoformat()}

def home(req):
	return render_to_response("home.html", {}, context_instance = RequestContext(req))

def homeajax(req):	

    targets = CountdownTarget.objects.filter(target__gt = datetime.now()).order_by("target")
    #Make json manually as combining django json and python json is not nice
    data = '{"commonInfo": %s, "targets": %s}' % (json.dumps(make_common_info()),serializers.serialize('json', targets[:5]))
    resp = HttpResponse(data, content_type="application/json")
    return resp

def details(req):
    return render_to_response("details.html", {}, context_instance = RequestContext(req))

def centralscript(req):
    return render_to_response("centralscript.js", {}, context_instance = RequestContext(req), mimetype = "application/ecmascript" )

def detailsscript(req):
    return render_to_response("detailsscript.js", {}, context_instance = RequestContext(req), mimetype = "application/ecmascript")

def homescript(req):
    return render_to_response("homescript.js", {}, context_instance = RequestContext(req), mimetype = "application/ecmascript") 

