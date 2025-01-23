// Function to get job postings from localStorage
function getPostings() {
    return JSON.parse(localStorage.getItem('jobPostings')) || [];
}

// Function to render approved job postings in the table 
function renderPostingsPage() {
    const postings = getPostings();
    const postingsList = document.getElementById('postings-list');
    postingsList.innerHTML = ''; // Clear current list

    const approvedPostings = postings.filter(post => post.status === 'approved');

    if (approvedPostings.length === 0) {
        postingsList.innerHTML = "<div>No approved job postings available.</div>";
        return;
    }

    // The arrow function inside of the forEach() function creates a card for each job posting containing its information and an applcation button.
    approvedPostings.forEach(posting => {
        const post = document.createElement('div');
        post.className = "postcontainer";
        post.innerHTML = `
            <div class="jobTitle" onclick="openJobDetails(${posting.id})">${posting.jobTitle}</div>
            <div>${posting.companyName}</div>
            <div>${posting.employmentType}</div>
            <div>${posting.jobLocation}</div>
            <div class="salary-apply-container">
                <div class="salarystyle">${posting.salary}</div>
                <button onclick="location.href = 'applicationpage.html'" class="apply-btn">Apply</button>
            </div>
        `;
        postingsList.appendChild(post);
    });
}

// Function to open the application form modal
function openApplicationForm(jobId, jobTitle) {
    const modal = document.getElementById('application-modal');
    const form = document.getElementById('application-form');

    document.getElementById('job-id').value = jobId;
    document.getElementById('applicant-name').value = '';
    document.getElementById('student-id').value = '';
    document.getElementById('applicant-email').value = '';
    document.getElementById('applicant-phone').value = '';
    document.getElementById('applicant-file').value = '';

    modal.style.display = "block";
}

// Function to open the job details modal
function openJobDetails(jobId) {
    const postings = getPostings();
    const posting = postings.find(post => post.id === jobId);

    if (posting) {
        document.getElementById('modal-job-title').textContent = posting.jobTitle;
        document.getElementById('modal-job-details').innerHTML = `
            <p><strong>Company:</strong> ${posting.companyName}</p>
            <p><strong>Location:</strong> ${posting.jobLocation}</p>
            <p><strong>Salary:</strong> ${posting.salary}</p>
            <p><strong>Employment Type:</strong> ${posting.employmentType}</p>
            <p class="wrap-text"><strong>Description:</strong> ${posting.jobDescription}</p>
        `;
        document.getElementById('job-details-modal').style.display = 'block';
    }
}

// Function to close the job details modal
function closeJobDetailsModal() {
    document.getElementById('job-details-modal').style.display = 'none';
}
    
// Function to close the application modal
function closeApplModal() {
    const modal = document.getElementById('application-modal');
    modal.style.display = "none";
}

// Function to show the success popup
function showSuccessPopup() {
    const successPopup = document.getElementById('success-popup');
    successPopup.style.display = "block";
    setTimeout(() => {
        successPopup.style.display = "none";
    }, 3000); // Hide after 3 seconds
}

// Function to get job postings from localStorage
function getPostings() {
    return JSON.parse(localStorage.getItem('jobPostings')) || [];
}

// Function to save job postings to localStorage
function savePostings(postings) {
    localStorage.setItem('jobPostings', JSON.stringify(postings));
}

// Function to clear all job postings from localStorage
function clearAllPostings() {
    localStorage.removeItem('jobPostings');
    renderPostings(); // Re-render the table after clearing
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

// Edit a posting (open modal)
function editPosting(id) {
    const postings = getPostings();
    const posting = postings.find(post => post.id === id);
    if (posting) {
        document.getElementById('job-title').value = posting.jobTitle;
        document.getElementById('company-name').value = posting.companyName;
        document.getElementById('job-location').value = posting.jobLocation;
        document.getElementById('salary').value = posting.salary;
        document.getElementById('description').value = posting.jobDescription;
        document.getElementById('employment-type').value = posting.employmentType;        
        document.getElementById('status').value = posting.status;
        document.getElementById('edit-job-form').onsubmit = function(event) {
            event.preventDefault();
            posting.jobTitle = document.getElementById('job-title').value;
            posting.companyName = document.getElementById('company-name').value;
            posting.jobLocation = document.getElementById('job-location').value;
            posting.salary = document.getElementById('salary').value;
            posting.jobDescription = document.getElementById('description').value;            
            posting.status = document.getElementById('status').value;
            posting.employmentType = document.getElementById('employment-type').value;
            savePostings(postings);
            closeModal();
            renderPostings();
        };
        openModal();
    }
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

// Open the modal
function openModal() {
    document.getElementById('application-modal').style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('application-modal').style.display = 'none';
}

    // Function to check the entered password
    function checkPassword() {
        const enteredPassword = document.getElementById("password-input").value;
        const attemptMessage = document.getElementById("attempt-message");

        if (enteredPassword === correctPassword) {
            // Password is correct, close the popup
            document.getElementById("password-popup").style.display = "none";
        } else {
            // Password is incorrect
            attempts++;
            if (attempts >= 3) {
                // Redirect after 3 attempts
                window.location.href = "postings.html";
            } else {
                attemptMessage.textContent = `Incorrect password. Attempt ${attempts} of 3.`;
            }
        }
    }
