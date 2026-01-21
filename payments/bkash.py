import requests
import json
from django.conf import settings


class BkashPaymentGateway:
    """
    bKash Payment Gateway Integration
    """

    def __init__(self):
        self.app_key = settings.BKASH_APP_KEY
        self.app_secret = settings.BKASH_APP_SECRET
        self.username = settings.BKASH_USERNAME
        self.password = settings.BKASH_PASSWORD
        self.base_url = settings.BKASH_BASE_URL
        self.token = None

    def grant_token(self):
        """Get authorization token from bKash"""
        url = f"{self.base_url}/checkout/token/grant"
        headers = {
            "Content-Type": "application/json",
            "username": self.username,
            "password": self.password
        }
        data = {
            "app_key": self.app_key,
            "app_secret": self.app_secret
        }

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            result = response.json()
            self.token = result.get('id_token')
            return result
        except requests.exceptions.RequestException as e:
            return {'error': str(e)}

    def create_payment(self, amount, invoice_number, merchant_invoice_number=None):
        """Create a payment request"""
        if not self.token:
            token_response = self.grant_token()
            if 'error' in token_response:
                return token_response

        url = f"{self.base_url}/checkout/payment/create"
        headers = {
            "Content-Type": "application/json",
            "Authorization": self.token,
            "X-APP-Key": self.app_key
        }
        data = {
            "amount": str(amount),
            "currency": "BDT",
            "intent": "sale",
            "merchantInvoiceNumber": merchant_invoice_number or invoice_number
        }

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {'error': str(e)}

    def execute_payment(self, payment_id):
        """Execute a payment"""
        if not self.token:
            token_response = self.grant_token()
            if 'error' in token_response:
                return token_response

        url = f"{self.base_url}/checkout/payment/execute"
        headers = {
            "Content-Type": "application/json",
            "Authorization": self.token,
            "X-APP-Key": self.app_key
        }
        data = {
            "paymentID": payment_id
        }

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {'error': str(e)}

    def query_payment(self, payment_id):
        """Query payment status"""
        if not self.token:
            token_response = self.grant_token()
            if 'error' in token_response:
                return token_response

        url = f"{self.base_url}/checkout/payment/query"
        headers = {
            "Content-Type": "application/json",
            "Authorization": self.token,
            "X-APP-Key": self.app_key
        }
        data = {
            "paymentID": payment_id
        }

        try:
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {'error': str(e)}
