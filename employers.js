document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    hamMenu.addEventListener('click', function() {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });
});

// Event handler which waits for form submission to create a new job posting to be approved 
    var imageholder
    document.getElementById('form1').addEventListener('submit', function(e) {
        e.preventDefault();

        const companyName = document.getElementById('cname').value;
        const companyDescription = document.getElementById('cdescription').value;
        const companyLocation = document.getElementById('clocation').value;
        const jobTitle = document.getElementById('jtitle').value;
        const jobLocation = document.getElementById('jlocation').value;
        const jobDescription = document.getElementById('jdescription').value;
        const jobPhone = document.getElementById('jphone').value;
        const jobEmail = document.getElementById('jemail').value;
        const jobFax = document.getElementById('jfax').value;
        const jobPay = document.getElementById('jpay').value;
        const cteTag = document.getElementById('ctetag').value;
        const postingThumbnail= imageholder
        const employmentType = document.getElementById('jtype').value;

        const newPosting = {
            id: Date.now(),
            postingThumbnail,
            companyName,
            companyDescription,
            companyLocation,
            jobTitle,
            jobLocation,
            jobDescription,
            jobPhone,
            jobEmail,
            jobFax,
            jobPay,
            cteTag,
            employmentType,
            status: 'pending', // Default job posting status
        };

                var cname = {fieldid:document.getElementById("cname"),priority:false};
                var jdescription = {fieldid:document.getElementById('jdescription'),priority:false};
                var cdescription = {fieldid:document.getElementById("cdescription"),priority:false};
                var clocation = {fieldid:document.getElementById("clocation"),priority:false};
                var pthumbnail = {fieldid:document.getElementById("pthumbnail"),priority:false};
                var jtitle = {fieldid:document.getElementById("jtitle"),priority:false};
                var jlocation = {fieldid:document.getElementById("jlocation"),priority:false};
                var jpay = {fieldid:document.getElementById("jpay"),priority:false};
                var jemail = {fieldid:document.getElementById("jemail"),priority:false};
                var jphone = {fieldid:document.getElementById("jphone"),priority:false};

            const fields = [
                cname,
                jdescription,
                cdescription,
                clocation,
                pthumbnail,
                jtitle,
                jlocation,
                jpay,
                jemail,
                jphone,
        ]

            var passable = true;

            if(cname.fieldid.value == "") {
                cname.priority = true
                cname.fieldid.style.animationDelay = "0.5s";
                cname.fieldid.style.borderColor = "#990F02";
                cname.fieldid.style.animationName = '';
                cname.fieldid.offsetHeight; 
                cname.fieldid.style.animationName = "shake";
                cname.fieldid.style.animationDuration = "0.25s"
                cname.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jdescription.fieldid.value == "") {
                jdescription.priority = true
                jdescription.fieldid.style.animationDelay = "0.5s";
                jdescription.fieldid.style.borderColor = "#990F02";
                jdescription.fieldid.style.animationName = '';
                jdescription.fieldid.offsetHeight; 
                jdescription.fieldid.style.animationName = "shake";
                jdescription.fieldid.style.animationDuration = "0.25s"
                jdescription.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (cdescription.fieldid.value == "") {
                cdescription.priority = true
                cdescription.fieldid.style.animationDelay = "0.5s";
                cdescription.fieldid.style.animationName = '';
                cdescription.fieldid.offsetHeight; 
                cdescription.fieldid.style.borderColor = "#990F02";
                cdescription.fieldid.style.animationName = "shake";
                cdescription.fieldid.style.animationDuration = "0.25s"
                cdescription.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (clocation.fieldid.value == "") {
                clocation.priority = true
                clocation.fieldid.style.animationDelay = "0.5s";
                clocation.fieldid.style.borderColor = "#990F02";
                clocation.fieldid.style.animationName = '';
                clocation.fieldid.offsetHeight; 
                clocation.fieldid.style.animationName = "shake";
                clocation.fieldid.style.animationDuration = "0.25s"
                clocation.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (pthumbnail.fieldid.value == "") {
                pthumbnail.priority = true
                pthumbnail.fieldid.style.animationDelay = "0.5s";
                pthumbnail.fieldid.style.borderColor = "#990F02";
                pthumbnail.fieldid.style.animationName = '';
                pthumbnail.fieldid.offsetHeight; 
                pthumbnail.fieldid.style.animationName = "shake";
                pthumbnail.fieldid.style.animationDuration = "0.25s"
                pthumbnail.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jtitle.fieldid.value == "") {
                jtitle.priority = true
                jtitle.fieldid.style.animationDelay = "0.5s";
                jtitle.fieldid.style.borderColor = "#990F02";
                jtitle.fieldid.style.animationName = '';
                jtitle.fieldid.offsetHeight; 
                jtitle.fieldid.style.animationName = "shake";
                jtitle.fieldid.style.animationDuration = "0.25s"
                jtitle.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jlocation.fieldid.value == "") {
                jlocation.priority = true
                jlocation.fieldid.style.animationDelay = "0.5s";
                jlocation.fieldid.style.borderColor = "#990F02";
                jlocation.fieldid.style.animationName = '';
                jlocation.fieldid.offsetHeight; 
                jlocation.fieldid.style.animationName = "shake";
                jlocation.fieldid.style.animationDuration = "0.25s"
                jlocation.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jpay.fieldid.value == "") {
                jpay.priority = true
                jpay.fieldid.style.animationDelay = "0.5s";
                jpay.fieldid.style.borderColor = "#990F02";
                jpay.fieldid.style.animationName = '';
                jpay.fieldid.offsetHeight; 
                jpay.fieldid.style.animationName = "shake";
                jpay.fieldid.style.animationDuration = "0.25s"
                jpay.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jemail.fieldid.value == "") {
                jemail.priority = true
                jemail.fieldid.style.animationDelay = "0.5s";
                jemail.fieldid.style.borderColor = "#990F02";
                jemail.fieldid.style.animationName = '';
                jemail.fieldid.offsetHeight; 
                jemail.fieldid.style.animationName = "shake";
                jemail.fieldid.style.animationDuration = "0.25s"
                jemail.fieldid.style.animationIterationCount = "2";
                passable = false;
            } if (jphone.fieldid.value == "") {
                jphone.priority = true
                jphone.fieldid.style.animationDelay = "0.5s";
                jphone.fieldid.style.borderColor = "#990F02";
                jphone.fieldid.style.animationName = '';
                jphone.fieldid.offsetHeight; 
                jphone.fieldid.style.animationName = "shake";
                jphone.fieldid.style.animationDuration = "0.25s"
                jphone.fieldid.style.animationIterationCount = "2";
                passable = false;
            }

            var fieldcheck = true;
            fields.every(field => {
                if (field.priority == false) {
                    fieldcheck = false;
                    return true
                }
            });

            var firstInvalidField = fields.find(field => field.priority === true);
            if (firstInvalidField) {
                firstInvalidField.fieldid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }



            if (passable) {
                const postings = JSON.parse(localStorage.getItem('jPostings')) || [];
                postings.push(newPosting);
                localStorage.setItem('jPostings', JSON.stringify(postings));

                // Reset form and preview
                document.getElementById("previewtext").style.display = "none";
                const previewDiv2 = document.getElementById("preview");
                previewDiv2.innerHTML = "";  // Clear previous image preview
                fields.forEach(field => {
                    field.fieldid.style.borderColor = "black";
                });

                document.getElementById("form1").reset();  // Reset form fields
            } 
            else {
                var firstInvalidField = fields.find(field => field.priority === true);
                if (firstInvalidField) {
                    firstInvalidField.fieldid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                alert("Please fill out all required fields.");
            }
    });



    document.getElementById("pthumbnail").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const previewDiv = document.getElementById("preview");

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement("img");
            img.setAttribute("id","previewimg")
            img.src = e.target.result;  // Set the image src to the data URL
            imageholder = e.target.result;
            img.style.maxWidth = "300px";  // Limit the preview size
            img.style.maxHeight = "300px";
            previewDiv.innerHTML = "";  // Clear previous preview
            document.getElementById("previewtext").style.display = "block"
            previewDiv.appendChild(img);  // Show the image preview

        };

        reader.readAsDataURL(file);  // Convert the image to a data URL
    } else {
        previewDiv.innerHTML = "<p>No image selected</p>";
    }
    
});
