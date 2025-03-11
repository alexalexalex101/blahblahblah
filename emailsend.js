// Function to send email data to the Python API
async function sendEmail() {
    var emailBody1 = "You have a new applicant:\nName: " + document.getElementById("fname").value + "\nStudent ID: " + document.getElementById("student-id").value +"\nGrade: " + document.getElementById("grade").value + "\n\nPlease contact " + document.getElementById("fname").value + " at:\nEmail:" + document.getElementById("email").value + "\nPhone: " + document.getElementById("phone").value + "\nAddress: " + document.getElementById("street-address").value + ", " + document.getElementById("city").value + " " + document.getElementById("state").value + " " + document.getElementById("zip").value + ".";
    var emailBody2 = "\n\nMore Information:\nExtra Curriculars: " + document.getElementById("extra-curricular-textbox").value + "\nHobbies: " + document.getElementById("interests-hobbies").value + "\nGoals: " + document.getElementById("aspirations").value;
    var emailBody = emailBody1 + emailBody2;

    const emailData = {
        email_sender: "timlindevelopment@gmail.com",
        email_receiver: "", // whatever the dummy email we're using is.
        subject: "You have a new Applicant:" + document.getElementById("fname").value,
        body: emailBody, 
        filename: document.getElementById("resume").value 
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        const responseData = await response.json();

        if (response.ok) {
            console.log("Email sent successfully!", responseData.message);
        } else {
            console.error("Error sending email:", responseData.error);
            alert("Error sending email:", responseData.error);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Network error:", error);
    }
}

// Call the function to send email
// sendEmail();
// This is the onClick function
