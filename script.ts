document.getElementById('resume')?.addEventListener('submit', function(event){
    event.preventDefault();

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    
    const nameElement = document.getElementById('name') as HTMLInputElement;
    const emailElement = document.getElementById('email') as HTMLInputElement;
    const phoneElement = document.getElementById('phone') as HTMLInputElement;
    const educationElement = document.getElementById('education') as HTMLTextAreaElement;
    const experienceElement = document.getElementById('experience') as HTMLTextAreaElement;
    const skillsElement = document.getElementById('skills') as HTMLTextAreaElement;
    const usernameElement = document.getElementById("username") as  HTMLInputElement;


if(profilePictureInput && nameElement && emailElement && phoneElement && educationElement
     && experienceElement && skillsElement && usernameElement){

    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skills = skillsElement.value;
    const username = usernameElement.value;
    const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`



    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

    const showresume = `
    <h2>Resume</h2>
    ${profilePictureURL ?`<img src="${profilePictureURL}" alt="profilePicture" class="profilePicture">` : ""}
    <p><strong>Name:</strong> <span id="edit-name" class="editable">${name} </span></p>
    <p><strong>Email:</strong> <span id="edit" class="editable">${email} </span></p>
    <p><strong>Phone:</strong> <span id="phone" class="editable">${phone} </span></p>


    <h3>Education</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <p id="edit-skills" class="editable">${skills}</p>
     `;


    // const downloadLink = document.createElement('a')
    // downloadLink.href = `data:text/html;charset=utf-8,` + encodeURIComponent(showresume)
    // downloadLink.download = uniquePath;
    // downloadLink.textContent = `Download your 2024 Resume`;


    const showresumeElement = document.getElementById('showresume')
    if(showresumeElement){
        showresumeElement.innerHTML = showresume;
        showresumeElement.classList.remove("hidden");


        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        showresumeElement.appendChild(buttonsContainer);

        const downloadButton = document.createElement("button");
        downloadButton.textContent  = "Downlaod as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();
        });
        buttonsContainer.appendChild(downloadButton);

        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try{
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g, "_")}_cv.html`; 
                
                await navigator.clipboard.writeText(shareableLink);
                alert("Shareable link copied to clipboard");
            }catch(err){
                console.error("Failed to copy link: ", err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
    });
    buttonsContainer.appendChild(shareLinkButton);

        // showresumeElement.appendChild(downloadLink)
        // makeEditable();
    }else{
        console.error('Resume output container not found');
    }
}else{
    console.error("Form elements are missing");
}

});


// function makeEditable(){
//     const editableElements = document.querySelectorAll('.editable');
//     editableElements.forEach(element =>{
//     element.addEventListener('click', function(){
//         const currentElement = element as HTMLElement;
//         const currentValue = currentElement.textContent || "";

//         if(currentElement.tagName === "p" || currentElement.tagName === 'SPAN'){
//             const input = document.createElement('input')
//             input.type = 'text'
//             input.value = currentValue
//             input.classList.add('editing-input')

//             input.addEventListener('blur', function(){
//                 currentElement.textContent = input.value;
//                 currentElement.style.display = 'inline'
//                 input.remove()
//             })

//             currentElement.style.display = 'none'
//             currentElement.parentNode?.insertBefore(input, currentElement)
//             input.focus()
//         }
//     })
//     })
// }