import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()


def send_contact_email(name: str, email: str, message: str):
    try:
        sender_email = os.getenv("SMTP_USER")
        app_password = os.getenv("SMTP_PASSWORD")
        receiver_email = os.getenv("SMTP_RECEIVER")

        subject = "New Contact Form Submission"

        body = f"""
    New message from your website:

    Name: {name}
    Email: {email}
    Message:
    {message}
    """

        msg = MIMEMultipart()
        msg["From"] = sender_email
        msg["To"] = receiver_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, app_password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
        
        print(f"✅ Email sent successfully from {email}")
        return True
    
    except smtplib.SMTPAuthenticationError as e:
        print(f"❌ SMTP Authentication Failed: {str(e)}")
        raise
    except smtplib.SMTPException as e:
        print(f"❌ SMTP Error: {str(e)}")
        raise
    except Exception as e:
        print(f"❌ Unexpected error sending email: {str(e)}")
        raise