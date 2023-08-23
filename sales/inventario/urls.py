from django.urls import path
from . import views

app_name = 'inventario'

urlpatterns = [
    # product views
    path('', views.product_list, name='product_list'),
    path('orders/', views.orders, name='orders'),
    path('<slug:prod>/', views.product_detail, name='product_detail'),
    path('order_detail/<int:order_id>/', views.order_detail, name='order_detail'),

]

