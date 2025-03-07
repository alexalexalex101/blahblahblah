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
        document.getElementById('description').value = posting.jobDescription;
        document.getElementById('employment-type').value = posting.employmentType;
        document.getElementById('status').value = posting.status;

        // Image preview 
        const previewDiv = document.getElementById("preview");
        const img = document.createElement("img");
        img.src = posting.postingThumbnail;
        previewDiv.innerHTML = "";  // Clear previous preview
        previewDiv.appendChild(img);  // Show the image preview

        document.getElementById('edit-job-form').onsubmit = function(event) {
            event.preventDefault();
            posting.jobTitle = document.getElementById('job-title').value;
            posting.postingThumbnail = imageholder
            posting.companyName = document.getElementById('company-name').value;
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
    document.getElementById('edit-modal').style.display = 'block';
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

// Function to open the job details modal
function openJobDetails(jobId) {
    const postings = getPostings();
    const posting = postings.find(post => post.id === jobId);

    if (posting) {
        document.getElementById('job-title').textContent = posting.jobTitle;


    }
}


// Function to render approved job postings in the page
function renderPostingsPage() {
    const postings = getPostings();
    const postingsList = document.querySelector('.jobs-container');  // Change here to use the class as it is in your HTML
    postingsList.innerHTML = ''; // Clear current list

    const approvedPostings = postings.filter(post => post.status === 'approved');

    if (approvedPostings.length === 0) {
        postingsList.innerHTML = "<div>No approved job postings available.</div>";
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
                </div>
                <p>${posting.jobDescription}</p>
                <div class="salary">$${posting.jobPay}/HR</div>
                <button class="buttons" onclick = "apply(${posting.jobId}">
                    Apply
                </button>
        `;
        document.getElementById('whole-preview').style.display = 'flex';
        document.getElementById('jobdetails').classList.add('active');
    }
}

function closePreview() {
    document.getElementById('whole-preview').style.display = 'none';
    document.getElementById('jobdetails').classList.remove('active');
}

function apply(btn) {
    const postings = getPostings();
    const posting = postings.find(post => btn === jobId);
    alert(posting.jobTitle)
}