document.getElementById('jobForm').addEventListener('submit', addApplication);

function addApplication(event) {
    event.preventDefault();
    
    let company = document.getElementById('company').value;
    let jobTitle = document.getElementById('jobTitle').value;
    let applyDate = document.getElementById('applyDate').value;
    let status = document.getElementById('status').value;
    let feedback = document.getElementById('feedback').value;

    let jobApplication = {
        company,
        jobTitle,
        applyDate,
        status,
        feedback // Store the feedback
    };

    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(jobApplication);
    localStorage.setItem('applications', JSON.stringify(applications));

    displayApplications();
    document.getElementById('jobForm').reset();
}

function displayApplications() {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    let applicationList = document.getElementById('applicationList');
    applicationList.innerHTML = '';

    applications.forEach((application, index) => {
        applicationList.innerHTML += `
            <div class="application-card">
                <div>
                    <strong>${application.company}</strong> - ${application.jobTitle}
                    <p>Status: ${application.status}</p>
                    <p>Applied on: ${application.applyDate}</p>
                    ${application.feedback ? `<p class="feedback">Feedback: ${application.feedback}</p>` : ''}
                </div>
                <button onclick="deleteApplication(${index})">Delete</button>
            </div>
        `;
    });
}

function deleteApplication(index) {
    let applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.splice(index, 1);
    localStorage.setItem('applications', JSON.stringify(applications));
    displayApplications();
}

// Display existing applications on load
window.onload = displayApplications;
