"""sales URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
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
#import os
#import sys
#sys.path.append(os.path.abspath('..'))

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from inventario import views


router = routers.DefaultRouter()
router.register(r'productos', views.ProdcutoView, 'producto')
router.register(r'lineas', views.LineaView, 'linea')
router.register(r'notas', views.NotaView, 'nota')
router.register(r'orders', views.OrderView, 'order')  # FIXME: NOT IN USE
#router.register(r'orders/(?P<order_id>\d+)', views.OrderView, 'order_detail')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('inventario/', include('inventario.urls', namespace='invetario')),
    path('api/', include(router.urls)),
]

