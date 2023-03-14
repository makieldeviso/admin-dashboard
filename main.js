
// Checks element first if it exist, then add event listener (start) ---
function checkElementAddEvent(element, eventListener, linkedFunction) {
    if (element != null) {
        element.addEventListener(eventListener, linkedFunction);
    } else {
        return
    }
}
// Checks element first if it exist, then add event listener (end) ---


const headerBar = document.querySelector("section#header-bar");
const subHeader = document.querySelector("section#sub-header");
const contentDash = document.querySelector("section#content-dash")
    window.addEventListener("scroll", checkScroll);

const hamburger = document.querySelector("#hamburger button");
const sidebar = document.querySelector("section#sidebar");
    checkElementAddEvent(hamburger, "click", toggleSidebar);
const closeSideBarButton = document.querySelector("button#exit-side");
    checkElementAddEvent(closeSideBarButton, "click", toggleSidebar)

const contentDividerBar = document.querySelector("section#content-divider");
const contentDividerButtons = document.querySelectorAll("section#content-divider button");
    contentDividerButtons.forEach(button => {
        checkElementAddEvent(button, "click", toggleContentPage);
    });

const projectGrid = document.querySelector("div#projects-grid");
const modalContainer = document.querySelector("div#modal-container");

const announcementSection = document.querySelector("section#announcements");



// Hides or Show Side Bar (start) ----
function toggleSidebar() {
    console.log(this);
    if (sidebar.hasAttribute("class")) {
        sidebar.removeAttribute("class");
    
        // Temporarily removes hamburger click ability
        if (this === hamburger) {
            hamburger.removeEventListener("click", toggleSidebar);
        }

    } else {
        sidebar.classList.add("hidden");
        hamburger.addEventListener("click", toggleSidebar);
    }
}
// Hides or Show Side Bar (end) ----


// Sticks divider button at top (start) ----
function checkScroll() {
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
// Sticks divider button at top (end) ----


// Toggles the content page between projects, announcement and team (start) ---
let currentPage = document.querySelector("section[data-page='projects']");
const contentPages = document.querySelectorAll("section#content-dash > section");

function toggleContentPage() {
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
// Toggles the content page between projects, announcement and team (end) ---


// Project Constructor function
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

// Project constructor: Constructs projects as objects
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


// Adds project to the DOM
addUserProject(userProjectsArray);


// Project Maker Function (start) -----------
function addUserProject(projectArray) {
    for (let i = 0; i < projectArray.length; i++) {
    // Project box (start) ---
        // Creates a container div for ONE project
        let projectBox = document.createElement("div");
        projectBox.setAttribute("data-class", "project-box");

    // Dialog
        let dialogBox = document.createElement("dialog");
        dialogBox.setAttribute("class", "projectModal");
        dialogBox.setAttribute("data-id", projectArray[i]["id"]);

        let dialogDiv = document.createElement("div");
        dialogDiv.setAttribute("class", "modalDiv");
        dialogBox.appendChild(dialogDiv);

    // Project Header
        // Creates an h4 element for the project
        let projectHeader = document.createElement("h4");
        projectHeader.setAttribute("data-id", projectArray[i]["id"] )
        projectHeader.addEventListener("click", expandModal);
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
        projectDetails.setAttribute("data-id", projectArray[i]["id"]);

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
        closeButton.setAttribute("data-id", `${projectArray[i]["id"]}`);
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


// These element should be declared after project creation function is run 
const projectHeader = document.querySelectorAll(`div[data-class="project-box"] h4`);
const projectDetails = document.querySelectorAll(`div[data-class="project-box"] div[data-detail]`);

// Isolates hover UI effect to header and description only (start) ----
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

// Isolates hover UI effect to header and description only (end) ----
// Project Maker Function (end) -----------



// Announcement Constructor
let announcementsArr = [];
class Announcement {
    constructor (id, subject, content, dateTime, dateText, author) {
        this.id = id;
        this.subject = subject;
        this.content = content;
        this.dateTime = dateTime;
        this.dateText = dateText;
        this.author = author;
        announcementsArr.push(this);
    }
}

// Announcement Constructor: Creates announcements
let announcement1 = new Announcement(
    "announcement1", // id
    "Site Maintenance", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-14", // dateTime YYYY-MM-DD
    "March 14, 2023",
    "Fred R. Pailjar"
);

let announcement2 = new Announcement(
    "announcement2", // id
    "Project Tanuki Deadline", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-13", // dateTime YYYY-MM-DD
    "March 13, 2023",
    "Christian J. Bardz"
);

let announcement3 = new Announcement(
    "announcement3", // id
    "National Tomodachi Day Celebration", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-10", // dateTime YYYY-MM-DD
    "March 10, 2023",
    "Joshua A. Hwang"
);

let announcement4 = new Announcement(
    "announcement4", // id
    "General Office Cleaning", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-09", // dateTime YYYY-MM-DD
    "March 09, 2023",
    "Arvin R. Noyrin"
);

let announcement5 = new Announcement(
    "announcement5", // id
    "Fred R. Pailjar Birthday!", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-02", // dateTime YYYY-MM-DD
    "March 02, 2023",
    "Rain R. Nature"
);

let announcement6 = new Announcement(
    "announcement6", // id
    "New Project - King Gym's App", // Subject
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat earum sapiente perferendis veritatis corrupti eaque nemo ullam animi et, ut repellat mollitia amet quas beatae, totam temporibus necessitatibus adipisci consequatur.", // Content
    "2023-03-01", // dateTime YYYY-MM-DD
    "March 01, 2023",
    "Charles O. Stephen"
);



// Runs the announcement maker function
addAnnouncement(announcementsArr);


// Announcement Maker function (start) ----

function addAnnouncement(announcements) {
    for (let i = 0; i< announcementsArr.length; i++) {
        // Creates container for one announcement
        let announceBox = document.createElement("div");
        announceBox.setAttribute("data-box", "announcement");
        announceBox.setAttribute("data-id", announcements[i]["id"]);

        //Adds event listener to the announceBox
        announceBox.addEventListener("click", expandModal);

        // Creates corresponding Modal
        let dialogBox = document.createElement("dialog");
        dialogBox.setAttribute("class", "announceModal");
        dialogBox.setAttribute("data-id", announcements[i]["id"]);
        
        let dialogDiv = document.createElement("div"); // required for styling
        dialogDiv.setAttribute("class", "modalDiv");
        dialogBox.appendChild(dialogDiv);

        // Creates exit Button for the modal
        let closeButton = document.createElement("button");
        let closeButtonIcon = document.createElement("i"); 
        closeButton.setAttribute("data-id", announcements[i]["id"]);
        closeButtonIcon.setAttribute("class", "fa-solid fa-xmark");
        closeButton.appendChild(closeButtonIcon);

        //  Adds event listener to close buttons
        closeButton.addEventListener("click", closeModal);
        dialogDiv.appendChild(closeButton);


        // Creates h4 for Subject
        let subject = document.createElement("h4");
        subject.setAttribute("data-subject", "subject");
        let subjectText = `${announcements[i]["subject"]}`;
        
        let subjectModal = subject.cloneNode(true);

        subject.textContent = subjectText;
        subjectModal.textContent = subjectText;

        // Appends subject to container & Appends subjectModal to dialogDiv
        announceBox.appendChild(subject);
        dialogDiv.appendChild(subjectModal);

        // Creates p for the announcement message
        let message = document.createElement("p");
        message.setAttribute("data-message", "message");
        let messageText = `${announcements[i]["content"]}`;

        let messageModal = message.cloneNode(true);
        messageModal.textContent = messageText;
        
             // Limit subject length in the preview
             if (messageText.length > 150) {
                let cutMessage = messageText.slice(0, 150);
                message.textContent = `${cutMessage + " ..."}`;
            } else {
                message.textContent = messageText;
            }

        // Appends message to container & Appends messageModal to dialogDiv
        announceBox.appendChild(message);
        dialogDiv.appendChild(messageModal);


        // Creates author/ post details container
        let postDiv = document.createElement("div");
        postDiv.setAttribute("data-post", "post");

        // Creates time for author/post details
        let date = document.createElement("time");
        date.setAttribute("datetime", `${announcements[i]["dateTime"]}`);
        date.textContent = `${announcements[i]["dateText"]}`;
        //Appends date to author/ post details container
        postDiv.appendChild(date);

        // Creates p element author for author/post details
        let author = document.createElement("p");
        author.setAttribute("data-author", "author");
        author.textContent = `${announcements[i]["author"]}`;
        // Appends author to author/ post details container
        postDiv.appendChild(author);

        // Clones Post Div and Append to dialogDiv
        let postDivModal = postDiv.cloneNode(true);
        dialogDiv.appendChild(postDivModal);

        // Appends author/post details (postDiv) to the announceBox
        announceBox.appendChild(postDiv);


        // Appends announceBox to announcement Section
        announcementSection.appendChild(announceBox);


        // Appends the dialogBox to the div#modal-container
        modalContainer.appendChild(dialogBox);
    }
}
// Announcement Maker function (end) ----



// Expands and close Modal (start) -------
function expandModal() {
    let detailsId = this.getAttribute("data-id");
    let thisModal = document.querySelector(`dialog[data-id="${detailsId}"]`);
    thisModal.showModal();
}

function closeModal() {
    let buttonId = this.getAttribute("data-id");
    let thisModal = document.querySelector(`dialog[data-id="${buttonId}"]`);
    
    thisModal.close();
}
// Expands and close Modal (end) -------