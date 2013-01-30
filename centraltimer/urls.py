from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'centraltimer.views.home', name="home"),
    url(r'^details$', 'centraltimer.views.details', name="details"),
    url(r'^homeajax$', 'centraltimer.views.homeajax', name="homeajax"),
    url(r'^scripts/detailsscript.js$', 'centraltimer.views.detailsscript', name="detailsscript"),
    url(r'^scripts/centralscript.js$', 'centraltimer.views.centralscript', name="centralscript"),
    url(r'^scripts/homescript.js$', 'centraltimer.views.homescript', name="homescript"),
    #url(r'^$', 'centraltimer.views.home', name="home"),
    # url(r'^$', 'centraltimer.views.home', name='home'),
    # url(r'^centraltimer/', include('centraltimer.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)
