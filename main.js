
// Checks element first if it exist, then add event listener
function checkElementAddEvent(element, eventListener, linkedFunction) {
    if (element != null) {
        element.addEventListener(eventListener, linkedFunction);
    } else {
        return
    }
}



const headerBar = document.querySelector("section#header-bar");
const subHeader = document.querySelector("section#sub-header");
const contentDash = document.querySelector("section#content-dash")
    window.addEventListener("scroll", checkScroll);

const hamburger = document.querySelector("#hamburger button");
const sidebar = document.querySelector("section#sidebar");
    checkElementAddEvent(hamburger, "click", toggleSidebar);

const contentDividerBar = document.querySelector("section#content-divider");
const contentDividerButtons = document.querySelectorAll("section#content-divider button");
    contentDividerButtons.forEach(button => {
        checkElementAddEvent(button, "click", toggleContentPage);
    });


function toggleSidebar() {
    if (sidebar.hasAttribute("class")) {
        sidebar.removeAttribute("class");
    } else {
        sidebar.classList.add("hidden");
    }

}


function toggleContentPage() {
    contentDividerButtons.forEach(button => {
        if (button.hasAttribute("class")) {
            button.removeAttribute("class");
        }
    });

    this.classList.add("clicked");
    // console.log("waw");
}


function checkScroll(event) {
    let headerBarHeight = Math.ceil(headerBar.clientHeight);
    let subHeaderHeight = Math.ceil(subHeader.clientHeight);
    let topOffSet = subHeaderHeight - headerBarHeight; //subHeader has padding-top
    // console.log(topOffSet);
    // console.log(window.scrollY);

    if (window.scrollY > topOffSet) {
        contentDividerBar.classList.add("fixed");
        contentDash.classList.add("offset");
    } else {
        contentDividerBar.classList.remove("fixed");
        contentDash.classList.remove("offset");
    }

}



let userProjectsArray = [];
class UserProjects {
    constructor(projectName, description, preview, commend, feedback, fork, codeSite, liveSite) {
        this.projectName = projectName;
        this.description = description;
        this.preview = preview;
        this.commendIcon = `<i class="fa-solid fa-leaf">`;
        this.commend = commend;
        this.feedbackIcon = `<i class="fa-regular fa-message">`;
        this.feedback = feedback;
        this.forkIcon = `<i class="fa-solid fa-code-fork">`;
        this.fork = fork;
        this.codeSite = codeSite;
        this.liveSite = liveSite;
        userProjectsArray.push(this);
    }
}

// Constructs projects as objects
// Comments for easier production of objects
let sampleProject = new UserProjects(
    "Sample Project", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "profile.png", //preview
    1, //commend
    20, //feedback
    5, //fork
    "https://www.youtube.com/watch?v=FWTNMzK9vG4&t=185s", //code Site
    "https://www.youtube.com/watch?v=dItUGF8GdTw" //live site
);

let sampleProject2 = new UserProjects(
    "Sample Project 2", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "profile.png", //preview
    11, //commend
    25, //feedback
    8, //fork
    "https://www.youtube.com/watch?v=FWTNMzK9vG4&t=185s", //code Site
    "https://www.youtube.com/watch?v=dItUGF8GdTw" //live site
);

let sampleProject3 = new UserProjects(
    "Sample Project 3", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "profile.png", //preview
    8, //commend
    26, //feedback
    9, //fork
    "https://www.youtube.com/watch?v=FWTNMzK9vG4&t=185s", //code Site
    "https://www.youtube.com/watch?v=dItUGF8GdTw" //live site
);

let sampleProject4 = new UserProjects(
    "Sample Project 4", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "profile.png", //preview
    8, //commend
    26, //feedback
    9, //fork
    "https://www.youtube.com/watch?v=FWTNMzK9vG4&t=185s", //code Site
    "https://www.youtube.com/watch?v=dItUGF8GdTw" //live site
);


const projectGrid = document.querySelector("div#projects-grid");
addUserProject(userProjectsArray);
function addUserProject(projectArray) {
    for (let i = 0; i < projectArray.length; i++) {
    // Project box (start) ---
        // Creates a container div for ONE project
        let projectBox = document.createElement("div");
        projectBox.setAttribute("data-class", "project-box");

    // Project Header
        // Creates an h4 element for the project
        let projectHeader = document.createElement("h4");
        projectHeader.textContent = `${projectArray[i]["projectName"]}`;

        // Appends h4 to the projectBox
        projectBox.appendChild(projectHeader);

    // Project details
        // Creates a container div for the project details
        let projectDetails= document.createElement("div");
        projectDetails.setAttribute("data-detail", "details");

        // Creates the p element for the text detail
        let detailText = document.createElement("p");
        let text = `${projectArray[i]["description"]}`;

        if (text.length > 180) {
            let cutText = text.slice(0, 100);
            detailText.textContent = cutText + " ...";
        } else {
            detailText.textContent = text;
        }
        

        //Creates div element for preview image
        let preview = document.createElement("div");
        preview.setAttribute("data-preview", "preview");
        preview.style.backgroundImage = `url(./images/${projectArray[i]["preview"]})`;

        //Appends the text to the project details container div
        projectDetails.appendChild(detailText);
        // Appends the preview to the details container div
        projectDetails.appendChild(preview);

        //Appends the project details div to the project box
        projectBox.appendChild(projectDetails);


    // Respond Buttons
        // Creates a Container for the buttons
        let buttonsContainer= document.createElement("div");
        buttonsContainer.setAttribute("data-action", "respond");
        

        let buttonSpec = [
            ["commend","fa-solid", "fa-leaf"],
            ["feedback", "fa-regular", "fa-message"],
            ["fork", "fa-solid", "fa-code-fork"]
        ];
        for(let j = 0; j < buttonSpec.length; j++) {

            // Creates a button element with dataset.action
            let button = document.createElement("button");
            button.setAttribute("data-action", buttonSpec[j][0]);

            // Creates i element with class from font awesome
            let buttonIcon = document.createElement("i");
            buttonIcon.classList.add(buttonSpec[j][1], buttonSpec[j][2]);

            // Creates a span Element
            let buttonSpan = document.createElement("span");

            // Appends buttonIcon to button
            button.appendChild(buttonIcon);

            // Appends span element to button
            button.appendChild(buttonSpan);

            // Appends the currently created button to container div
            buttonsContainer.appendChild(button);

            console.log(button);
        }
        
        let commendButton = buttonsContainer.querySelector(`button[data-action="commend"]`);
        let feedbackButton = buttonsContainer.querySelector(`button[data-action="feedback"]`);
        let forkButton = buttonsContainer.querySelector(`button[data-action="fork"]`);

        commendButton.querySelector("span").textContent = projectArray[i]["commend"];
        feedbackButton.querySelector("span").textContent = projectArray[i]["feedback"];
        forkButton.querySelector("span").textContent = projectArray[i]["fork"];

        //Append buttonsContainer to the project-box
        projectBox.appendChild(buttonsContainer);

        //Appends the whole project-box on the projects-grid
        projectGrid.appendChild(projectBox);
    }
}


