import logging
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model
from accounts.models import Contract, Phase, Notification, Concession
from django.db.models.signals import post_save
from django.dispatch import receiver

logger = logging.getLogger(__name__)

def check_expiring_items():
    today = timezone.now().date()
    threshold_date = today + timedelta(days=60)

    # Check Contracts
    contracts = Contract.objects.filter(
        ech_date__lte=threshold_date,
        ech_date__gte=today
    )
    
    # Get all active users to notify
    users = get_user_model().objects.filter(is_active=True)
    
    # Create notifications for contracts
    for contract in contracts:
        days_until_expiration = (contract.ech_date - today).days
        for user in users:
            existing_notification = Notification.objects.filter(
                target=user,
                category='EXPCTR',
                msg__contains=f"Contract {contract.num} is nearing expiration",
                date__date=today
            ).exists()
            
            if not existing_notification:
                notification = Notification.objects.create(
                    category='EXPCTR',
                    msg=f"Contract {contract.num} is nearing expiration in {days_until_expiration} days",
                    deadline=days_until_expiration
                )
                notification.target.add(user)

    # Check Phases
    phases = Phase.objects.filter(
        end_date__lte=threshold_date,
        end_date__gte=today
    )
    
    # Create notifications for phases
    for phase in phases:
        days_until_expiration = (phase.end_date - today).days
        for user in users:
            existing_notification = Notification.objects.filter(
                target=user,
                category='PP',
                msg__contains=f"Phase {phase.name} is nearing expiration",
                date__date=today
            ).exists()
            
            if not existing_notification:
                notification = Notification.objects.create(
                    category='PP',
                    msg=f"Phase {phase.name} is nearing expiration in {days_until_expiration} days",
                    deadline=days_until_expiration
                )
                notification.target.add(user)
    
    return True


def create_perimeter_notification(concession):
    """
    Create a notification for a new perimeter (Concession).
    """
    try:
        today = timezone.now().date()
        users = get_user_model().objects.filter(is_active=True)
        
        for user in users:
            existing_notification = Notification.objects.filter(
                target=user,
                category='PP',  # Using 'PP' due to model constraints
                msg=f"New perimeter added: {concession.name}",
                date__date=today
            ).exists()
            
            if not existing_notification:
                notification = Notification.objects.create(
                    category='PP',
                    msg=f"New perimeter added: {concession.name}",
                    deadline=7
                )
                notification.target.add(user)
                logger.info(f"Notification created for new perimeter: {concession.name} for user: {user.username}")
    except Exception as e:
        logger.error(f"Error creating notification for perimeter {concession.name}: {str(e)}", exc_info=True)

@receiver(post_save, sender=Concession)
def notify_new_perimeter(sender, instance, created, **kwargs):
    if created:
        try:
            create_perimeter_notification(instance)
            logger.info(f"Triggered notification for new perimeter: {instance.name}")
        except Exception as e:
            logger.error(f"Error triggering notification for perimeter {instance.name}: {str(e)}", exc_info=True)