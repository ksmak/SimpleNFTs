from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)
from django.db import models
from django.contrib.auth import hashers


class CustomUserManager(BaseUserManager):
    """
        Custom user manager
    """

    def create_user(self, username):
        if not username:
            raise ValueError("User must have a username")

        user = self.model(
            username=username,
            password=hashers.make_password(None)
        )
        user.save(using=self._db)

        return user

    def create_superuser(self, username, password):
        user = self.create_user(
            username=username
        )
        user.set_password(password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """
        Custom user model
    """
    username = models.CharField(
        verbose_name='username',
        max_length=150,
        unique=True
    )
    first_name = models.CharField(
        verbose_name='first name',
        max_length=150,
        null=True,
        blank=True
    )
    last_name = models.CharField(
        verbose_name='last name',
        max_length=150,
        null=True,
        blank=True
    )
    is_active = models.BooleanField(
        verbose_name='is active',
        default=True,
    )
    is_staff = models.BooleanField(
        verbose_name='is staff',
        default=False
    )
    is_superuser = models.BooleanField(
        verbose_name='is superuser',
        default=False,
    )
    date_of_creation = models.DateTimeField(
        verbose_name='date of creation',
        auto_now_add=True
    )
    date_of_change = models.DateTimeField(
        verbose_name='date of change',
        auto_now=True
    )

    @property
    def full_name(self):
        if (self.first_name or self.last_name):
            return f"{self.first_name} {self.last_name}".strip()

        return self.username

    USERNAME_FIELD = 'username'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.username

    class Meta:
        ordering = ('username', )
