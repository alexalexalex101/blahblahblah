from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from email.message import EmailMessage
import ssl
import smtplib
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to send the email
def send(email_sender, email_receiver, subject, body, filename):
    email_password = 'nqum zlcx hjer uhby'
    em = MIMEMultipart()
    em['From'] = email_sender
    em['To'] = email_receiver
    em['Subject'] = subject
    body = body

    em.attach(MIMEText(body, "plain"))

    # Read the attachment file
    with open(filename, "rb") as attachment:
        part = MIMEBase("application", "octet-stream")
        part.set_payload(attachment.read())

    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename={filename}",
    )

    em.attach(part)

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receiver, em.as_string())

# Define an endpoint to send the email
@app.route('/send-email', methods=['POST'])
def send_email():
    try:
        # Get JSON data from the POST request
        data = request.get_json()

        email_sender = "timlindevelopment@gmail.com"
        email_receiver = data.get('email_receiver')
        subject = data.get('subject')
        body = data.get('body')  # Ensure the body is included
        filename = data.get('filename')

        # Check if all required fields are provided
        if not all([email_sender, email_receiver, subject, body, filename]):
            return jsonify({"error": "Missing required parameters"}), 400

        # Call the send function
        send(email_sender, email_receiver, subject, body, filename)

        return jsonify({"message": "Email sent successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
