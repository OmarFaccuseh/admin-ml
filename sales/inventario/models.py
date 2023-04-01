from django.db import models

from django.urls import reverse
from datetime import datetime, timezone
from model_utils import Choices

# Deberia conectar con la api de mercadolibre los productos publicados.
# y si hay alguna manera recibir nuevos productos publicados para
# actualizar la base de datos aqui en django.

# No se si deba lograr conectar mediante un boton en la pantalla de admin.
# o inlcuso con un boton en el fronted.


class Categoria(models.Model):
    nombre = models.CharField(max_length=250)


class Producto(models.Model):
    nombre = models.CharField(max_length=250)
    slug = models.SlugField(max_length= 250)
    descripcion = models.CharField(max_length=250)
    sku = models.CharField(max_length=250, default='0')
    costo = models.FloatField()
    precio = models.FloatField()
    margen = models.FloatField(default='0')
    existencia = models.IntegerField(default='0')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    categoria = models.ForeignKey(Categoria, related_name='productos_cat', on_delete=models.DO_NOTHING)

    class Meta:
        ordering = ('nombre',)

    def __str__(self):
        return self.nombre

    def get_absolute_url(self):
        return reverse('inventario:product_detail', args=[self.slug])


class Nota(models.Model):
    code_note = models.CharField(max_length=100)  # venta id ML
    body = models.TextField(max_length=2000)   # actualmente no se usa
    name_customer = models.CharField(max_length=250)
    name_recibe = models.CharField(max_length=250, default='')
    created_date = models.DateTimeField(auto_now_add=True)
    anotations = models.CharField(max_length=250)

    @property
    def total(self):
        sum = 0
        for linea in self.lineas_nota:
            sum += linea.total
        return sum


class Linea(models.Model):
    nota_id = models.ForeignKey(Nota, related_name='lineas_nota', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField(default=0)

    @property
    def total(self):
        return self.cantidad * self.producto.precio


# almacena el token y el reresh token
class Tokens(models.Model):
    token = models.CharField(max_length=250)
    refresh_token = models.CharField(max_length=250)
    is_update = models.BooleanField(default=False)
    last_update = models.DateTimeField(default=datetime.now(timezone.utc))


class Order(models.Model):
    STATUSES = Choices(
        (1, 'procesando'),
        (2, 'entregado'),
        (3, 'cancelado'),
    )
    # PRODUCT ID DEBE SER UN MANY2MANY DE PRODUCTO TODO.
    order_id = models.CharField(max_length=250, default='NA')
    product = models.CharField(max_length=250, default=None, null=True)
    customer = models.CharField(max_length=250, default='dona nona')
    unit_price = models.FloatField(default=0.0)
    qty = models.IntegerField(default=0)
    subtotal = models.FloatField(default=0.0)
    total = models.FloatField(default=0.0)
    # TODO order by date
    date = models.CharField(max_length=250, default='NA')
    status = models.CharField(max_length=250, default='NA')
    notas = models.CharField(max_length=250, default='NA', db_index=True,)





