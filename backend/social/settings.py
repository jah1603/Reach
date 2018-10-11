"""
Django settings for Reach (tm) project.
Generated by 'django-admin startproject' using Django 1.11.15.
For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
from social_reach.access_tokens import facebook_app_token , facebook_access_token

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

TEMPLATE_PATH = os.path.join(BASE_DIR, 'templates')

DATABASE_PATH = os.path.join(BASE_DIR, 'social_reach.db')

FACEBOOK_APP_ID=str('facebook_app_token')
FACEBOOK_APP_SECRET= str('facebook_access_token')

TEMPLATE_DIRS = (
    TEMPLATE_PATH,
)

TEMPLATES = [
  {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            TEMPLATE_PATH,
                ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
    ]

# SETS UP AUTH
REST_FRAMEWORK = {
    # 'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
    'DEFAULT_PERMISSION_CLASSES': (
        # 'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
    )
}

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0-ahzl(+74!yt70l_5zkky64-$7#2x6q^&#3&w!9=a^2@_@)x8'
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


# Specifies where to redirect users should they attempt o view restricted content while not logged in. In this case they are redirected to the log-in screen.
LOGIN_URL = '/social_reach/login/'


ALLOWED_HOSTS = []

# Sets up browser-length session, meaning the session ends upon close of browser
SESSION_EXPIRE_AT_BROWSER_CLOSE = True


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'social_reach',
    'rest_auth.registration',
    'bootstrap3',
    'social_django',
    'rest_framework',
    'corsheaders',
    'coreapi',
    'rest_auth',
    'allauth',
    'django.contrib.sites',
    'allauth.account',
    'rest_framework.authtoken',
    'djoser',
]

EMAIL_USE_TLS=True
EMAIL_HOST='smtp.gmail.com'
EMAIL_HOST_USER='reach.dating@gmail.com'
EMAIL_HOST_PASSWORD='castleterrace1'
EMAIL_PORT=587
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

DJOSER = {
    'PASSWORD_RESET_CONFIRM_URL': '#/password/reset/confirm/{uid}/{token}',
    'ACTIVATION_URL': '#/activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {'activation': 'djoser.email.ActivationEmail',
'confirmation': 'djoser.email.ConfirmationEmail',
'password_reset': 'djoser.email.PasswordResetEmail',},

    'EMAIL': {'activation': 'social_reach.email.ActivationEmail',
    'confirmation': 'djoser.email.ConfirmationEmail',
    'password_reset': 'djoser.email.PasswordResetEmail',},
    'SEND_CONFIRMATION_EMAIL': True,
}

CORS_ORIGIN_WHITELIST = (
    'localhost:3000/'
)



SITE_ID = 1

#customisaing the token
#
# SIMPLE_JWT = {
#     'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
#     'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
#     'ROTATE_REFRESH_TOKENS': False,
#     'BLACKLIST_AFTER_ROTATION': True,
#
#     'ALGORITHM': 'HS256',
#     'SIGNING_KEY': settings.SECRET_KEY,
#     'VERIFYING_KEY': None,
#
#     'AUTH_HEADER_TYPES': ('Bearer',),
#     'USER_ID_FIELD': 'id',
#     'USER_ID_CLAIM': 'user_id',
#
#     'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
#     'TOKEN_TYPE_CLAIM': 'token_type',
#
#     'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
#     'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
#     'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
# }

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
]

ROOT_URLCONF = 'social.urls'

CORS_ALLOW_CREDENTIALS = True


WSGI_APPLICATION = 'social.wsgi.application'

AUTHENTICATION_BACKENDS = (

    'django.contrib.auth.backends.ModelBackend',
    'social_core.backends.facebook.FacebookOAuth2',
)


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_UNIQUE_EMAIL = True

# DEFAULT_FROM_EMAIL = 'jmail1603jmail@gmail.com'
# ACCOUNT_EMAIL_SUBJECT_PREFIX = '[REACH] '
# ACCOUNT_EMAIL_VERIFICATION = 'optional'

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media') # Absolute path to the media directory

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_PATH = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = (
    STATIC_PATH,
    )


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
