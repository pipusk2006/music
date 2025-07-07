# utils/upload_to_s3.py
import boto3
from django.conf import settings

def upload_to_s3(file_obj, filename):
    session = boto3.session.Session()
    client = session.client(
        service_name='s3',
        endpoint_url=settings.S3_ENDPOINT_URL,
        aws_access_key_id=settings.S3_ACCESS_KEY_ID,
        aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
    )

    client.upload_fileobj(file_obj, settings.S3_BUCKET_NAME, filename)
    return f"{settings.S3_PUBLIC_URL_PREFIX}/{filename}"
