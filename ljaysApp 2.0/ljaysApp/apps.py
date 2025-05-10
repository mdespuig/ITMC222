from django.apps import AppConfig


class LjaysappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'ljaysApp'
    
    def ready(self):
        import ljaysApp.signals