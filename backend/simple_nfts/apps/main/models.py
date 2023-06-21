from django.db import models


class Art(models.Model):
    """
        Art model.
    """
    STATUS_FOR_SALE = 1
    STATUS_SOLD = 0

    STATUSES = (
        ('for sale', STATUS_FOR_SALE),
        ('sold', STATUS_SOLD),
    )

    status = models.IntegerField(
        verbose_name='status',
        choices=STATUSES,
        default=STATUS_FOR_SALE
    )
    uri = models.TextField(
        verbose_name='uri',
    )
    owner = models.CharField(
        verbose_name='owner',
        max_length=42
    )
    title = models.CharField(
        verbose_name='title',
        max_length=200
    )
    price = models.IntegerField(
        verbose_name='price',
        default=0
    )
    image = models.ImageField(
        upload_to='images/'
    )
    date_of_creation = models.DateTimeField(
        verbose_name='date_of_creation',
        auto_now_add=True
    )

    class Meta:
        verbose_name = 'art'

    def __str__(self) -> str:
        return f'{self.title} ({self.owner})'
