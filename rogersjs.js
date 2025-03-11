    // Function to get job postings from localStorage
    function getPostings() {
        return JSON.parse(localStorage.getItem('jPostings')) || [];
    }

    // Render job postings in the admin panel table
    function renderPostings() {
        const postings = getPostings();
        const postingsList = document.getElementById('postings-list');
        const noPostingsMessage = document.getElementById('no-postings-message');
        
        postingsList.innerHTML = ''; // Clear current list
        noPostingsMessage.innerHTML = ''; // Clear previous message

        if (postings.length === 0) {
            noPostingsMessage.innerHTML = "<p>No job postings available.</p>"; // Show message if no postings
            return;
        }

        postings.forEach(posting => {
            
            const post = document.createElement('tr');
            post.innerHTML = `
                <td>${posting.companyName}</td>
                <td>${posting.jobTitle}</td>
                <td>${posting.jobLocation}</td>
                <td class="${posting.status === 'approved' ? 'status-approved' : posting.status === 'pending' ? 'status-pending' : 'status-hidden'}">${posting.status}</td>
                <td class="actions">
                    <a href="#" onclick="editPosting(${posting.id})">Edit</a>
                    <a href="#" onclick="approvePosting(${posting.id})">Approve</a>
                    <span class="delete-btn" onclick="removePosting(${posting.id})">X</span>
                </td>
            `;
            postingsList.appendChild(post);
        });
    }

    // Remove a posting from the list when the red X button is clicked
    function removePosting(id) {
        const postings = getPostings();
        const postingIndex = postings.findIndex(post => post.id === id);
        if (postingIndex !== -1) {
            postings.splice(postingIndex, 1); // Remove the posting from the array
            savePostings(postings);
            renderPostings(); // Re-render the table to reflect the changes
        }
    }

    // Edit a posting (open modal)
    function editPosting(id) {
        const postings = getPostings();
        const posting = postings.find(post => post.id === id);

        if (posting) {
            document.getElementById('job-title').value = posting.jobTitle;
            document.getElementById('company-name').value = posting.companyName;
            document.getElementById('job-location').value = posting.jobLocation;
            document.getElementById('job-pay').value = posting.jobPay;
            document.getElementById('cte-tag').value = posting.cteTag;
            document.getElementById('description').value = posting.jobDescription;
            document.getElementById('employment-type').value = posting.employmentType;
            document.getElementById('status').value = posting.status;
            document.getElementById('pthumbnail').value = ""

            // Image preview 
            const previewDiv = document.getElementById("preview");
            const img = document.createElement("img");
            img.src = posting.postingThumbnail;
            previewDiv.innerHTML = "";  // Clear previous preview
            previewDiv.appendChild(img);  // Show the image preview

            document.getElementById('edit-job-form').onsubmit = function(event) {
                event.preventDefault();

                posting.jobTitle = document.getElementById('job-title').value;
                if (changed) {
                    posting.postingThumbnail = imageholder
                } else {
                    posting.postingThumbnail = posting.postingThumbnail
                    imageholder = ""
                    
                }
                changed = false
                posting.companyName = document.getElementById('company-name').value;
                posting.cteTag = document.getElementById('cte-tag').value;
                posting.jobLocation = document.getElementById('job-location').value;
                posting.jobPay = document.getElementById('job-pay').value;
                posting.jobDescription = document.getElementById('description').value;  
                posting.employmentType = document.getElementById('employment-type').value;          
                posting.status = document.getElementById('status').value;
                savePostings(postings);
                closeModal();
                renderPostings();
            };
            
            openModal();
        }
    }


    // Function to save job postings to localStorage
    function savePostings(postings) {
        localStorage.setItem('jPostings', JSON.stringify(postings));
    }

    // Close the modal
    function closeModal() {
        document.getElementById('edit-modal').style.display = 'none';
    }

    // Open the modal
    function openModal() {
        document.getElementById('edit-modal').style.display = 'flex';
        document.getElementById('admincontent').scrollTo(0, 0);
    }


    // Approve a posting
    function approvePosting(id) {
        const postings = getPostings();
        const posting = postings.find(post => post.id === id);
        if (posting) {
            posting.status = 'approved';
            savePostings(postings);
            renderPostings();
        }
    }

    function applyPageViewer(idofpost) {
        localStorage.setItem('poststuff', JSON.stringify(idofpost));
        setTimeout(window.location.href = "apply.html",500)
    }

    

    function submitButtonProcedure() {
        const posted = JSON.parse(localStorage.getItem('poststuff')) || [];
        const postings = getPostings();
        const posting = postings.find(post => post.id == posted);
        document.getElementById('thanku').innerHTML = `
                <img src="images/circled-checkmark.png" style = 'overflow: hidden;object-fit: scale-down;' alt="Circled Checkmark">
                <h3>Thank You!</h3>
                <div class="company-name">
                    <a>for applying to ${posting.companyName}</a>
                </div>
                <p>Your application will be sent to ${posting.companyName} and you should receive a response back from them within the next few days</p>
            `;
            document.getElementById('form-containment').style.display = "none"
            document.getElementById('thanku').style.display = "flex"
            sendEmail();
    }


    // Function to open the job details modal
    function openJobDetails(jobId) {
        const postings = getPostings();
        const posting = postings.find(post => post.id === jobId);
        if (posting) {
            document.getElementById('jobdetails').innerHTML = `
                    <i class="fas fa-times" onclick="closePreview()"></i>
                    <img src="${posting.postingThumbnail}" alt="">
                    <h3>${posting.jobTitle}</h3>
                    <div class="company-name">
                        <a>${posting.companyName}</a>
                    </div><br>
                    <div>${posting.jobEmail}</div>
                    <p>${posting.jobDescription}</p>
                    <div class="salary" id="salaryID">$${posting.jobPay}/HR</div>
                    <button class="buttons" id="applyButton" onclick = "applyPageViewer(${posting.id})">
                        Apply
                    </button>
            `;
            document.getElementById('whole-preview').style.display = 'flex';
            document.getElementById('jobdetails').classList.add('active');
            document.getElementById('buttonbox').innerHTML = `
                <button type="button" class="back-btn" id="back2">Back</button>
                <button type="button" id="submitButton" onclick="submitButtonProcedure(${posting.id})">Submit</button>
            `
        }


    }

    // Function to render approved job postings in the page
    function renderPostingsPage(tag,first,last,jobtype) {
        const postings = getPostings();
        const postingsList = document.querySelector('.jobs-container');  // Change here to use the class as it is in your HTML
        postingsList.innerHTML = ''; // Clear current list
        
        var typeApproved
        if (jobtype == "none") {
            typeApproved = postings
        }
        else {
            typeApproved = postings.filter(posting => posting.employmentType === jobtype)
        }
        
        var tagApproved
        if (tag == "none") {
            tagApproved = typeApproved
        }
        else {
            tagApproved = typeApproved.filter(posting => posting.cteTag === tag)
        }

        const firstApprovedPostings = tagApproved.filter(post => post.jobPay >= first);

        const lastApprovedPostings = firstApprovedPostings.filter(post => post.jobPay <= last);

        const approvedPostings = lastApprovedPostings.filter(post => post.status === 'approved');


        if (approvedPostings.length === 0) {
            postingsList.innerHTML = "<div>No job postings available or match your filters.</div>";
            return;
        }

        // Loop through the approved postings and create a card for each job posting
        approvedPostings.forEach(posting => {
            const post = document.createElement('div');
            post.className = "jobs";
            post.addEventListener('click', function() {
                openJobDetails(posting.id);
            });
            post.innerHTML = `
                <div>
                    <img src="${posting.postingThumbnail}" alt="">
                    <h3>${posting.jobTitle}</h3>
                    <div class="salary">$${posting.jobPay}/HR</div>
                </div>
            `;
            postingsList.appendChild(post);
        });
    }


    function closePreview() {
        document.getElementById("applyPageContainer").style.display = "none";
        document.getElementById('whole-preview').style.display = 'none';
        document.getElementById('jobdetails').classList.remove('active');
        // Reset form fields
        document.getElementById("form1").reset();
        document.getElementById("form2").reset();
        document.getElementById("form3").reset();
        // Forms reset back to form 1
        document.getElementById("form1").style.display = "block";
        document.getElementById("form2").style.display = "none";
        document.getElementById("form2").style.display = "none";
        // Turns elements back to orignal colors and no animations
        var fname = document.getElementById("fname");
        fname.style.borderColor = "#e2ecfc";
        fname.style.animationName = "none";
        var studentId = document.getElementById("student-id");
        studentId.style.borderColor = "#e2ecfc";
        studentId.style.animationName = "none";
        var grade = document.getElementById("grade");
        grade.style.borderColor = "#e2ecfc"
        grade.style.animationName = "none";

        var email = document.getElementById("email");
        email.style.borderColor = "#e2ecfc";
        email.style.animationName = "none";
        var phone = document.getElementById("phone");
        phone.style.borderColor = "#e2ecfc";
        phone.style.animationName = "none";
        var streetAdress = document.getElementById("streetAddress");
        streetAdress.style.borderColor = "#e2ecfc";
        streetAdress.style.animationName = "none";
        var city = document.getElementById("city");
        city.style.borderColor = "#e2ecfc";
        city.style.animationName = "none";
        var state = document.getElementById("state");
        state.style.borderColor = "#e2ecfc";
        state.style.animationName = "none";
        var zip = document.getElementById("zip");
        zip.style.borderColor = "#e2ecfc";
        zip.style.animationName = "none";
    }

    // Function to send email data to the Python API
    async function sendEmail() {
        var emailBody1 = "You have a new applicant:\nName: " + document.getElementById("fname").value + "\nStudent ID: " + document.getElementById("student-id").value +"\nGrade: " + document.getElementById("grade").value + "\n\nPlease contact " + document.getElementById("fname").value + " at:\nEmail: " + document.getElementById("email").value + "\nPhone: " + document.getElementById("phone").value + "\nAddress: " + document.getElementById("streetAddress").value + ", " + document.getElementById("city").value + " " + document.getElementById("state").value + " " + document.getElementById("zip").value + ".";
        var emailBody2 = "\n\nMore Information:\nHobbies: " + document.getElementById("interests-hobbies").value + "\nGoals: " + document.getElementById("aspirations").value;
        var emailBody = emailBody1 + emailBody2;

        const emailData = {
            email_sender: "timlindevelopment@gmail.com",
            email_receiver: "timlindevelopment@gmail.com", // whatever the dummy email we're using is.
            subject: "You have a new Applicant:" + document.getElementById("fname").value,
            body: emailBody, 
            filename: "resume.pdf"
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
