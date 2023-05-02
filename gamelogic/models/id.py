from django.db import models
# from .category import Category


class id(models.Model):
    name = models.CharField(max_length=50)
    age = models.IntegerField(default=0)


    @staticmethod
    def get_products_by_id(ids):
        return id.objects.filter(id__in =ids)

