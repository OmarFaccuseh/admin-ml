from django.http import JsonResponse, HttpResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import action
from django.db import models

from .models import Producto, Linea, Nota, Order
from rest_framework import viewsets
from .serializers import ProductoSerializer, LineaSerializer, NotaSerializer, OrderSerializer
from django.core import serializers


def product_list(request):
    return render(request, 'inventario/producto/product_list.html', {'productos': Producto.objects.all()})


def product_detail(request, prod):
    producto = get_object_or_404(Producto, slug=prod)
    return render(request, 'inventario/producto/product_detail.html', {'producto': producto})


# param can also get with:  request.GET.get("order_id")
@csrf_exempt
def order_detail(request, order_id):

    order = Order.objects.filter(order_id=order_id)
    # no jala  serializer = OrderSerializer(order)
    # no jala  jsonresp_resp = JsonResponse(serializer.data)
    qs_json = serializers.serialize('json', order)
    serialize_resp = HttpResponse(qs_json, content_type='application/json')
    return serialize_resp


# ViewSet - Proveen tanto la lista como el detalle
class ProdcutoView(viewsets.ModelViewSet):
    serializer_class = ProductoSerializer
    queryset = Producto.objects.all()


class LineaView(viewsets.ModelViewSet):
    serializer_class = LineaSerializer
    queryset = Linea.objects.all()


class NotaView(viewsets.ModelViewSet):
    serializer_class = NotaSerializer
    queryset = Nota.objects.all()


# this only return first 100 elements
class OrderView(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all().order_by('-date')[:99]

    '''
    def get_queryset(self, *args, **kwargs):
        if self.kwargs.get('order_id'):
            return self.queryset.filter(order_id=self.kwargs.get('order_id'))
        super(OrderView, self).get_queryset(*args, *kwargs)

    @action(methods=['get'], detail=True)
    def get_order_detail(self, request, pk):
        orden = get_object_or_404(Order, order_id=pk)
        return orden
    '''
