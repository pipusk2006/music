import boto3
from django.conf import settings
from botocore.exceptions import ClientError

def upload_to_s3(file_obj, filename):
    try:
        session = boto3.session.Session()
        client = session.client(
            service_name='s3',
            endpoint_url=settings.S3_ENDPOINT_URL,
            aws_access_key_id=settings.S3_ACCESS_KEY_ID,
            aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
        )

        content_type = 'audio/mpeg' if filename.endswith('.mp3') else 'image/jpeg'

        client.upload_fileobj(
            file_obj,
            settings.S3_BUCKET_NAME,
            filename,
            ExtraArgs={'ContentType': content_type}
        )

        print(f"✅ Uploaded to: {filename}")
        return f"{settings.S3_PUBLIC_URL_PREFIX}/{filename}"
    
    except ClientError as e:
        print(f"❌ Ошибка при загрузке {filename}: {e}")
        return None


