import uuid
import pathlib
from django.db import models


def upload_to(instance, filename):
    return f'images/{uuid.uuid4()}{pathlib.Path(filename).suffix}'


class Art(models.Model):
    """
        Art model.
    """
    image = models.ImageField(
        verbose_name='image',
        upload_to=upload_to
    )
