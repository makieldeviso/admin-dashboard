
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

const modalContainer = document.querySelector("div#modal-container");






function toggleSidebar() {
    if (sidebar.hasAttribute("class")) {
        sidebar.removeAttribute("class");
    } else {
        sidebar.classList.add("hidden");
    }

}

let currentPage = document.querySelector("section[data-page='projects']");
const contentPages = document.querySelectorAll("section#content-dash > section")
// console.log(contentPages);
async function toggleContentPage() {
    contentDividerButtons.forEach(button => {
        if (button.hasAttribute("class")) {
            button.removeAttribute("class");
        }
    });

    this.classList.add("clicked");

    let page = this.dataset.page;
    let contentPage = document.querySelector(`section[data-page="${page}"]`);

    currentPage.classList.add("swiped");
    contentPage.classList.remove("swiped");
    currentPage = contentPage;

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
    constructor(id, projectName, description, preview, commend, feedback, fork, codeSite, liveSite) {
        this.id = id;
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
    "sample-project", //id
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
    "sample-project-2", //id
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
    "sample-project-3", //id
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
    "sample-project-4", //id
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

    // Dialog
        let dialogBox = document.createElement("dialog");
        dialogBox.setAttribute("class", "projectModal");
        dialogBox.setAttribute("id", projectArray[i]["id"]);

        let dialogDiv = document.createElement("div");
        dialogDiv.setAttribute("class", "modalDiv");
        dialogBox.appendChild(dialogDiv);

    // Project Header
        // Creates an h4 element for the project
        let projectHeader = document.createElement("h4");
        projectHeader.textContent = `${projectArray[i]["projectName"]}`;

        // Appends h4 to the projectBox and Dialog box
        appendMultiple(projectHeader, projectBox, dialogDiv);

        // Reusable function to append element to TWO containers
        function appendMultiple(element, container1, container2) {
            container1.appendChild(element);

            let elementClone = element.cloneNode(true); //clones element
            container2.appendChild(elementClone);
        }


    // Project details
        // Creates a container div for the project details
        let projectDetails= document.createElement("div");
        projectDetails.setAttribute("data-detail", "details");
        projectDetails.setAttribute("id", projectArray[i]["id"]);

        // Creates another container for project details modal
        let projectDetailsModal = projectDetails.cloneNode(true);


        // Adds event listener to the project details div
        projectDetails.addEventListener("click", expandModal);


        // Creates the p element for the text detail
        let detailText = document.createElement("p");

        // Creates the p element for the text detail (Modal)
        let detailTextFull = document.createElement("p");

        let text = `${projectArray[i]["description"]}`;

         // Adds content to detail text (modal)
        detailTextFull.textContent = text;

        // Adds content to detail text project box
        if (text.length > 180) { 
            let cutText = text.slice(0, 100);
            detailText.textContent = cutText + " ...";
        } else {
            detailText.textContent = text;
        }
        

        //Appends the text to the project details container div
        projectDetails.appendChild(detailText);

        // Appends full description to details (Modal) 
        projectDetailsModal.appendChild(detailTextFull);

        //Creates div element for preview image
        let preview = document.createElement("div");
        preview.setAttribute("data-preview", "preview");
        preview.style.backgroundImage = `url(./images/${projectArray[i]["preview"]})`;

        // Appends the preview to the details container div and modal
        appendMultiple(preview, projectDetails, projectDetailsModal);

        //Appends the project details div to the project box and dialog box
        projectBox.appendChild(projectDetails);
        dialogDiv.appendChild(projectDetailsModal);


    // Respond Buttons
        // Creates a Container for the buttons
        let buttonsContainer= document.createElement("div");
        buttonsContainer.setAttribute("data-action", "respond");
        

        // Creates reusable button creator object
        let buttonSpec = [];
        class buttonSpecObj {
            constructor (action, class1, class2) {
                this.action = action;
                this.class1 = class1;
                this.class2 = class2;
                buttonSpec.push(this);
            }
        }

        let commendSpec = new buttonSpecObj("commend", "fa-solid", "fa-leaf");
        let feedbackSpec = new buttonSpecObj("feedback", "fa-regular", "fa-message");
        let forkSpec = new buttonSpecObj("fork", "fa-solid", "fa-code-fork");

        for(let j = 0; j < buttonSpec.length; j++) {

            // Creates a button element with dataset.action
            let button = document.createElement("button");
            button.setAttribute("data-action", buttonSpec[j]["action"]);

            // Creates i element with class from font awesome
            let buttonIcon = document.createElement("i");
            buttonIcon.classList.add(buttonSpec[j]["class1"], buttonSpec[j]["class2"]);

            // Creates a span Element
            let buttonSpan = document.createElement("span");

            // Appends buttonIcon to button
            button.appendChild(buttonIcon);

            // Appends span element to button
            button.appendChild(buttonSpan);

            // Appends the currently created button to container div
            buttonsContainer.appendChild(button);
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



// modal Specific Content
        //Adds button at the top of modal
        let headerText = dialogDiv.querySelector("h4");
        let closeButton = document.createElement("button");
        let closeButtonIcon = document.createElement("i"); 
        closeButton.setAttribute("id", `${projectArray[i]["id"]}`);
        closeButtonIcon.setAttribute("class", "fa-solid fa-xmark");
        closeButton.appendChild(closeButtonIcon);

        // Adds Event listener to the Modal
        closeButton.addEventListener("click", closeModal);
        dialogDiv.insertBefore(closeButton, headerText);

        // Reusable function to Add link to modal
        // dataAttribute -> adds dataset.link attribute, you specify attribute value
        // labelText -> Specify label for the link eg. "Code:"
        // thisSite -> get link from object in the Array argument of this function
        function makeLink(dataAttributeName, labelText, thisSite ) {
            let container = document.createElement("div");
            container.setAttribute("data-link", dataAttributeName);

            let label = document.createElement("p");
            label.textContent = labelText;
            container.appendChild(label);

            let site = document.createElement("a");
            site.setAttribute("href", `${thisSite}`);
            site.textContent = ("Link Here");
            container.appendChild(site);

            dialogDiv.appendChild(container);
        }

        // Adds code link
        makeLink("code-site", "View Code:", projectArray[i]["codeSite"]);

        // Adds live site link
        makeLink("live-site", "Live Preview:", projectArray[i]["liveSite"]);

        // Appends dialog box to modal container
        modalContainer.appendChild(dialogBox);
    }
}


function expandModal() {
    let detailsId = this.getAttribute("id");
    let thisModal = document.querySelector(`dialog#${detailsId}`)
    
    thisModal.showModal();
}

function closeModal() {
    let buttonId = this.getAttribute("id");
    let thisModal = document.querySelector(`dialog#${buttonId}`);
    
    thisModal.close();
}

// These element should be declared after project creation function is run 
// Isolates hover UI effect to header and description only
const projectHeader = document.querySelectorAll(`div[data-class="project-box"] h4`);
const projectDetails = document.querySelectorAll(`div[data-class="project-box"] div[data-detail]`);

projectHeader.forEach(element => {
    checkElementAddEvent(element, "mouseover", hoverEvent);
    checkElementAddEvent(element, "mouseout", hoverEvent);
});

projectDetails.forEach(element => {
    checkElementAddEvent(element, "mouseover", hoverEvent);
    checkElementAddEvent(element, "mouseout", hoverEvent);
});

function hoverEvent(event) {
    let projectBox = this.parentElement;
    let e = event.type;
    
    if (e === "mouseover") {
        projectBox.classList.add("hovered");
    } else if (e === "mouseout") {
        projectBox.classList.remove("hovered");
    }
}   