const dashContainer = document.querySelector("div#dash-container");
const menuContainer = document.querySelector("div#menu"); 
    window.addEventListener("resize", reposition);
    window.addEventListener("load", reposition);

const headerBar = document.querySelector("section#header-bar");
const searchButton = document.querySelector("div#search button");
    searchButton.addEventListener("click", errorModalShow);
const notificationButton = document.querySelector("div#notification button");
    notificationButton.addEventListener("click", errorModalShow);


const subHeader = document.querySelector("section#sub-header");

const hamburger = document.querySelector("#hamburger button");
const sidebar = document.querySelector("section#sidebar");
    checkElementAddEvent(hamburger, "click", toggleSidebar);
const closeSideBarButton = document.querySelector("button#exit-side");
    checkElementAddEvent(closeSideBarButton, "click", toggleSidebar)

const contentDividerBar = document.querySelector("section#content-divider");
const contentDividerButtons = document.querySelectorAll("section#content-divider button");
const contentMainButton = document.querySelector("button#content-main-button")
    contentDividerButtons.forEach(button => {
        checkElementAddEvent(button, "click", toggleContentPage);
    });

const contentDash = document.querySelector("section#content-dash");
const contentMain = document.querySelector("section#content-main");
    window.addEventListener("scroll", checkScroll);

const modalContainer = document.querySelector("div#modal-container");

const announcementSection = document.querySelector("section#announcements");
const announceGrid = document.querySelector("div#announce-grid");

const teamSection = document.querySelector("section#team");
const teamGrid = document.querySelector("div#team-grid");

const sideBarButtons = document.querySelectorAll("ul#sections button");
    sideBarButtons.forEach(button => {
        checkElementAddEvent(button, "click", toggleSection);
        checkElementAddEvent(button, "click", toggleSidebar);
    });

const settingsButtons = document.querySelectorAll("ul#settings button");
settingsButtons.forEach(button => {
    checkElementAddEvent(button, "click", errorModalShow);
});

const completedTally = document.querySelector("span#completed-task");
const ongoingTally = document.querySelector("span#ongoing-task");
const nysTally = document.querySelector("span#nys-task");

const library = document.querySelector("div#library");
const projects = document.querySelector("section#projects");
const profile = document.querySelector("section#profile");
const messages = document.querySelector("section#messages");
const tasks = document.querySelector("section#tasks");
const communities = document.querySelector("section#communities");

const widgetPlacement = document.querySelector("div#widget-placement");
const widgets = document.querySelector("div#widgets");
const projectsWidget = document.querySelector("div#projects-widget");
const profileWidget = document.querySelector("div#profile-widget");
const messagesWidget = document.querySelector("div#messages-widget");
const tasksWidget = document.querySelector("div#tasks-widget");
const communitiesWidget = document.querySelector("div#tasks-widget");

const projectGrid = document.querySelector("div#projects-grid");
const messagesGrid = document.querySelector("div#messages-grid");
const tasksGrid = document.querySelector("div#tasks-grid");


const projectButtons = document.querySelectorAll("ul#action-buttons button");
    projectButtons.forEach(button => {
        button.addEventListener("click", errorModalShow);
    });

// Some global variables (start) -
// Gets currentDate
let toDate = new Date();
let todayMonth = new Intl.DateTimeFormat("en-US", {month: "long"}).format(toDate);
let todayDay = new Date(toDate).getDate();
let todayYear = new Date(toDate).getFullYear();
let fullDate = `${todayMonth} ${todayDay}, ${todayYear}`;

let baseDate = Date.parse(new Date(fullDate)); // this is timeStamp
let oneDay = 86400000; // one day in milliseconds
let inboxUnopened;
let messageNumber = 50;
// Some global variables (end) -

// Toggle content Sections (start) -----
// Sections Object Constructor (start) ----
let sectionsObjArray = [];
let screenWidth;

class Sections {
    constructor (id, sectionElement, sectionWidget, name) {
        this.id = id;
        this.sectionElement = sectionElement;
        this.sectionWidget = sectionWidget;
        this.minimize = (()=>{
            sectionElement.classList.add("minimized");
            sectionWidget.classList.add("minimized");
        });


        this.maximize = (()=>{
            sectionElement.classList.remove("minimized");
            sectionWidget.classList.remove("minimized");
        });

        // Used for smaller screens where content divider is displayed
        this.renameButton = ()=>{contentMainButton.textContent = name};


        sectionsObjArray.push(this);
    }
}
// Sections Object Constructor (end) ----

// Creates Section Object Area (start) -----

// let homeSection = new Sections ("content-dash", contentDash);
let projectsSection = new Sections ("projects", projects, projectsWidget, "Your Projects");
let profileSection = new Sections ("profile", profile, profileWidget, "Profile");
let messagesSection = new Sections ("messages", messages, messagesWidget, "Messages");
let tasksSection = new Sections ("tasks", tasks, tasksWidget, "Tasks");
let communitiesSection = new Sections ("communities", communities, communitiesWidget, "Communities");
// Creates Section Object Area (start) -----

// Toggle content section function (start) ----
function toggleSection() {
    let buttonId = this.dataset.id;
    console.log(buttonId);

    let targetObject;

    // Searches for the array of Section objects that match the 
    // button and save it into the targetObject variable
    sectionsObjArray.some(section => {
        if (section["id"] === buttonId){
            targetObject = section;
            return true;
        }
    });

    // Minimize all content sections and widgets first
    // Note: Home/Projects is the default maximized on load
    sectionsObjArray.forEach(section => {
        section.minimize();

        // Appends section and widgets to library from contentMain
        library.appendChild(section["sectionElement"]);
        widgets.appendChild(section["sectionWidget"]);
    });

    // Then maximize corresponding section
    targetObject.maximize();

    // Appends section to contentMain from library
    contentMain.appendChild(targetObject["sectionElement"]);
    widgetPlacement.appendChild(targetObject["sectionWidget"]);

    // Renames contentMain button to correspond to current visible section
    targetObject.renameButton();
   
    //Adds styling to clicked sidebar button 
    //Checks if there are clicked button first

    sideBarButtons.forEach(button => {
        if (button.hasAttribute("class")) {
            button.removeAttribute("class");
        }
    });

    this.classList.add("clicked");
}
// Toggle content section function (end) -
// toggle content Sections (end) -


// Checks element first if it exist, then add event listener (start) -
function checkElementAddEvent(element, eventListener, linkedFunction) {
    if (element != null) {
        element.addEventListener(eventListener, linkedFunction);
    } else {
        return
    }
}
// Checks element first if it exist, then add event listener (end) -


// Hides or Show Side Bar (start) -
function toggleSidebar() {
    // console.log(this);
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
// Hides or Show Side Bar (end) -

// Sticks divider button at top (start) -
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
// Sticks divider button at top (end) -


// Toggles the content page between contents, announcement and team (start) -
let currentPage = document.querySelector("section[data-page='content-main']");
const contentPages = document.querySelectorAll("section#content-dash > section");

function toggleContentPage() {
    subHeader.scrollIntoView({behavior: "smooth", block: "center"});
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
// Toggles the content page between projects, announcement and team (end) -


// Project Constructor function
// Saves project work stats
let completedProjects = 0;
let ongoingProjects = 0;
let nysProjects = 0;

let userProjectsArray = [];
class UserProjects {
    constructor(id, projectName, description, preview, commend, feedback, fork, progress, codeSite, liveSite) {
        this.id = id;
        this.projectName = projectName;
        this.description = description;
        this.preview = preview;
        // this.commendIcon = `<i class="fa-solid fa-leaf">`;
        this.commend = commend;
        // this.feedbackIcon = `<i class="fa-regular fa-message">`;
        this.feedback = feedback;
        // this.forkIcon = `<i class="fa-solid fa-code-fork">`;
        this.fork = fork;
        this.progress = progress;
        this.codeSite = codeSite;
        this.liveSite = liveSite;
        userProjectsArray.push(this);
    }
}

// Project constructor: Constructs projects as objects
// Comments for easier production of objects
let sampleProject = new UserProjects(
    "rock-paper-scissors", //id
    "JANKEN!", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "janken-prev.png", //preview
    1, //commend
    20, //feedback
    5, //fork
    45, // progress
    "https://github.com/makieldeviso/rock-paper-scissor", //code Site
    "https://makieldeviso.github.io/rock-paper-scissor/" //live site
);

let sampleProject2 = new UserProjects(
    "etch-a-sketch", //id
    "PIXEL SLATE", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "sketch-prev.png", //preview
    11, //commend
    25, //feedback
    8, //fork
    100, // progress
    "https://github.com/makieldeviso/sketch", //code Site
    "https://makieldeviso.github.io/sketch/" //live site
);

let sampleProject3 = new UserProjects(
    "calculator", //id
    "PMC", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "calc-prev.png", //preview
    8, //commend
    26, //feedback
    9, //fork
    90, // progress
    "https://github.com/makieldeviso/calculator", //code Site
    "https://makieldeviso.github.io/calculator/" //live site
);

let sampleProject4 = new UserProjects(
    "sign-in", //id
    "Waryur Helmets - Create Account", //projectName
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni eaque iste, aliquid hic nemo suscipit fugiat dolorum laborum aliquam impedit facere provident dignissimos esse illum rerum saepe quam sint. Quisquam!", //description
    "sign-in-prev.png", //preview
    8, //commend
    26, //feedback
    9, //fork
    89, // progress
    "https://github.com/makieldeviso/sign-up-form", //code Site
    "https://makieldeviso.github.io/sign-up-form/" //live site
);


// Adds project to the DOM
addUserProject(userProjectsArray);
// Tallies the work stats in profile section
workStatsTally();

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


        // Adds progress
        let progressDiv = document.createElement("div");
        progressDiv.setAttribute("data-link", "progress");

        let progressLabel = document.createElement("p");
        progressLabel.textContent = "Progress:";
        progressDiv.appendChild(progressLabel);

        let completion = projectArray[i]["progress"];

        let progressBar = document.createElement("div");
        progressBar.setAttribute("data-class", "bar");
        progressBar.setAttribute("data-content", `${completion}%`);

        let progress = document.createElement("div");
        progress.setAttribute("data-class", "fill");
        progressBar.appendChild(progress);

        
        progress.style.width = `${completion}%`;

        //Adds label inside the progress bar
        let completionLabel = document.createElement("p");
        completionLabel.textContent = `${completion}%`;
        progressBar.appendChild(completionLabel);

        //Adds color coding/indicator to the progress

        if (completion < 50) {
            progress.setAttribute("class", "low");
        } else if (completion >= 50 && completion < 90) {
            progress.setAttribute("class", "mid");
        } else if (completion >= 90 && completion < 100) {
            progress.setAttribute("class", "high");
        } else if (completion === 100) {
            progress.setAttribute("class", "complete");
        }

        // Tallies the work stats of the user
        // Note: does not appear in modal, used for profile section
        if (completion === 0) {
            nysProjects += 1;
        } else if(completion > 0 && completion < 100) {
            ongoingProjects += 1;
        } else if (completion === 100) {
            completedProjects += 1;
        }

        progressDiv.appendChild(progressBar);

        //Appends ProgressDiv to dialogDiv
        dialogDiv.appendChild(progressDiv);

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
            site.setAttribute("target", "_blank");
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

// Isolates hover UI effect to header and description only (start) --
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

// Isolates hover UI effect to header and description only (end) --
// Project Maker Function (end) -

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
    fullDate,
    "May R. Pailjar"
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
    "May R. Pailjar Birthday!", // Subject
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

        window.addEventListener("load", cutText);
        window.addEventListener("resize", cutText);


        cutText();
        function cutText() {
            if (window.innerWidth >= 1024) {
                if (messageText.length > 80) {
                    let cutMessage = messageText.slice(0, 80);
                    message.textContent = `${cutMessage + " ..."}`;
                } else {
                    message.textContent = messageText;
                }
            } else {
                
                if (messageText.length > 150) {
                    let cutMessage = messageText.slice(0, 150);
                    message.textContent = `${cutMessage + " ..."}`;
                } else {
                    message.textContent = messageText;
                }
            }
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
        announceGrid.appendChild(announceBox);


        // Appends the dialogBox to the div#modal-container
        modalContainer.appendChild(dialogBox);
    }
}
// Announcement Maker function (end) ----


// Team Constructor
let teamMembersArray = [];
class member {
    constructor (id, profilePicture, username, address, status) {
        this.id = id;
        this.profilePicture = profilePicture;
        this.username = username;
        this.address = address;
        this.status = status;
        teamMembersArray.push(this);
    }
}

// Adds a Member
let member1 = new member(
    "member1", // id
    "pic1.jpg", // profilePicture
    "May R. Pailjar", // userName
    "@may", // address
    "online" // status
);

let member2 = new member(
    "member2", // id
    "pic2.jpg", // profilePicture
    "Arvin R. Noyrin", // userName
    "@arvin", // address
    "offline" // status
);

let member3 = new member(
    "member3", // id
    "pic3.jpg", // profilePicture
    "Joshua A. Hwang", // userName
    "@joshua", // address
    "do not disturb" // status
);

let member4 = new member(
    "member4", // id
    "pic4.jpg", // profilePicture
    "Christian J. Bardz", // userName
    "@christian", // address
    "idle" // status
);

let member5 = new member(
    "member5", // id
    "pic5.jpg", // profilePicture
    "Rain R. Nature", // userName
    "@rain", // address
    "online" // status
);

let member6 = new member(
    "member6", // id
    "pic6.jpg", // profilePicture
    "Charles O. Stephen", // userName
    "@charles", // address
    "offline" // status
);


// Runs addMember Function 
addMember(teamMembersArray);

// Adds Member Function (start) -
function addMember(teamArray) {
    for (let i = 0; i < teamArray.length; i++) {
        // Creates teamMember container
        let memberBox = document.createElement("div");
        memberBox.setAttribute("data-class", "member");

        // Creates Div for the picture
        let profile = document.createElement("div");
        profile.setAttribute("data-profile", "picture");
        profile.style.backgroundImage = `url(./images/${teamArray[i]["profilePicture"]})`;

        // Creates Div for status indicator in picture;
        let indicator = document.createElement("div");
        indicator.setAttribute("data-status", "status");

        // Adjusts indicator depending in member status
        switch (teamArray[i]["status"]) {
            case "online":
                indicator.setAttribute("class", "online");
                break;
            
            case "offline":
                indicator.setAttribute("class", "offline");
                break;

            case "idle":
                indicator.setAttribute("class", "idle");
                break;
            
            case "do not disturb":
                indicator.setAttribute("class", "no-disturb");
                break;
            
            default:
                indicator.setAttribute("class", "offline");
        }

        // Appends indicator to profile then appends to memberBox
        profile.appendChild(indicator);
        memberBox.appendChild(profile);

        // Appends username, address and status
        let dataEntry = [
            {dataType: "username",
            entry: teamArray[i]["username"]},

            {dataType: "address",
            entry: teamArray[i]["address"]},

            {dataType: "status",
            entry: teamArray[i]["status"]},
        ];

        for (let j = 0; j < dataEntry.length; j++ ) {
            let data = document.createElement("p");
            data.setAttribute("data-profile", dataEntry[j]["dataType"]);

            data.textContent = `${dataEntry[j]["entry"]}`;

            // Append data to memberBox
            memberBox.appendChild(data);
        }

        // Create button for message
        let sendMessageButton = document.createElement("button");
        sendMessageButton.setAttribute("data-message", "message");

        sendMessageButton.addEventListener("click", errorModalShow);

        let messageIcon = document.createElement("i");
        messageIcon.setAttribute("class", "fa-solid fa-message");

        sendMessageButton.appendChild(messageIcon);

        // Append send message Button to memberBox
        memberBox.appendChild(sendMessageButton);

        //Appends memberBox(All) to the team Section
        teamGrid.appendChild(memberBox);
    }
}
// Adds Member Function (end) -


// Messages Maker Function (placeholder) (start) -
addMessage();

function addMessage() {
    for (let i = 0; i < messageNumber; i++) {

        // Creates container for ONE message
        let messageContainer = document.createElement("div");
        let openStatus = ["opened", ""];
        let randomOpenStatus = openStatus[Math.floor(Math.random() * 2)];
        messageContainer.setAttribute("data-id",`msg${messageNumber - i}`);
        messageContainer.setAttribute("class", `${randomOpenStatus}`);

        messageContainer.addEventListener("click", errorModalShow);

        // Creates author p
        let author = document.createElement("p");
        author.setAttribute("data-author", `msg${messageNumber - i}-author`);
        let name = teamMembersArray[Math.floor(Math.random() * teamMembersArray.length)]["username"];
        author.textContent = name;
        messageContainer.appendChild(author);

        //Creates date time
        let timeDate = document.createElement("p");
        timeDate.setAttribute("data-time-date", `msg${messageNumber - i}-time-date`);

        let dateSpan = document.createElement("span");
        dateSpan.setAttribute("data-class", "date");

        let randomDescent = baseDate - (Math.floor(Math.random() * 5 + 1) * oneDay);
                
        let date = new Date(randomDescent);
        let dateMonthLong = new Intl.DateTimeFormat("en-US", {month: "long"}).format(date);

        let dateDay = new Date(randomDescent).getDate();

        let dateYear = new Date(randomDescent).getFullYear();

        let dateString = `${dateMonthLong} ${dateDay}, ${dateYear}`;
        baseDate = randomDescent;

        dateSpan.textContent = dateString;
        timeDate.appendChild(dateSpan);

        let timeSpan = document.createElement("span");
        timeSpan.setAttribute("data-class", "time");
        let hours = (Math.floor(Math.random() * 12) + 1);
        let minutes = Math.floor(Math.random() * 59);

            if (minutes.toString().length === 1) {
                minutes = `0${minutes}`;
            }
        
        let halfTime = ["AM", "PM"];
        let half = halfTime[Math.floor(Math.random() * 2)];
        let timeString = `${hours}:${minutes} ${half}`;

        timeSpan.textContent = timeString;
        timeDate.appendChild(timeSpan);

        messageContainer.appendChild(timeDate);

        // Creates Subject p 
        let subject = document.createElement("p");
        subject.setAttribute("data-subject", `msg${messageNumber - i}-subject`);
        let subjectText =  `Subject ${messageNumber - i}: Lorem ipsum dolor sit amet`;
        subject.textContent = subjectText;
        messageContainer.appendChild(subject);

        // Creates Message p 
        let message = document.createElement("p");
        message.setAttribute("data-message", `msg${messageNumber - i}-message`);
        let messageText =  `This is a placeholder message. The authors are randomized in every page reload. The date descends in random day increment and the subject is numbered descendingly.`;
        message.textContent = messageText;
        messageContainer.appendChild(message);

        // Appends the message container to the messageGrid
        messagesGrid.appendChild(messageContainer);

        //Counts unopened messages
        countUnopened();
    }
}

// Counts unopened messages function for inbox
function countUnopened() {
    let openedMessages = document.querySelectorAll("div#messages-grid div.opened");
    inboxUnopened = messageNumber - openedMessages.length;

    const unreadText = document.querySelector("p#unread");
    unreadText.textContent = inboxUnopened;
}
// Messages Maker Function (placeholder) (end) -


// Tasks Maker Function (placeholder) (start) -
let taskNumber = 10;
addTasks();
function addTasks() {
    for (let i = 0; i < taskNumber; i++) {
        let taskContainer = document.createElement("div");
        taskContainer.setAttribute("data-id", `task${taskNumber - i}`);

        // Reusable element maker
        function addElement(element, dataClass, content) {
            let newElement = document.createElement(element);
            newElement.setAttribute("data-class", `${dataClass}`);
            newElement.textContent = `${content}`;
           
            if (element === "button") {
                newElement.addEventListener("click", errorModalShow);
            }

            taskContainer.appendChild(newElement);
        }

        addElement("p", "task-id-label", "Task ID:");
        addElement("p", "task-id", `TID#${120 + (taskNumber - i)}`);
        addElement("p", "task-title-label", "Title:");
        addElement("p", "task-title", `Lorem Ipsum Title ${taskNumber - i}`);
        addElement("button", "accept", "Accept");
        addElement("button", "decline", "Decline");
    
        tasksGrid.appendChild(taskContainer);
    }
}

// Tasks Maker Function (placeholder) (end) -


// Dedicated Error Modal (start) -
const errorModal = document.querySelector("dialog[data-id='error']");
const errorExit = document.querySelector("button[data-id='error']");
    errorExit.addEventListener("click", errorModalShow);

function errorModalShow() {
    if (this === errorExit) {
        errorModal.close();
    } else {
        if (this.getAttribute("class") != "opened") {
            this.classList.add("opened");
            countUnopened();
        }

        errorModal.showModal();
    } 
}
// Dedicated Error Modal (end) -


// Expands and close Modal (start) -
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
// Expands and close Modal (end) -


// Content dash re-position (start) -
function reposition() {
    let headerBarHeight = Math.ceil(headerBar.clientHeight);
    let subHeaderHeight = Math.ceil(subHeader.clientHeight);
    let dividerHeight = Math.ceil(contentDividerBar.clientHeight);
    let topHeightPlus = headerBarHeight + subHeaderHeight + dividerHeight;
    let topHeight = headerBarHeight + subHeaderHeight;

    //Saves window width to global variable
    screenWidth = window.innerWidth;

    if (window.innerWidth > 768) {
        menuContainer.appendChild(contentDash);
        contentDash.style.height = `calc(99vh - ${topHeightPlus}px)`;
    } else if (window.innerWidth <= 768){
        dashContainer.insertBefore(contentDash, library);
        contentDash.style.height = "";
    }

    if (window.innerWidth >= 1024) {
        contentDash.style.height = `calc(99vh - ${topHeight}px)`;
    }
}
// Content dash re-position (end) -

// Changes the user work stats in the profile section (start) -
function workStatsTally() {
    completedTally.textContent = completedProjects;
    ongoingTally.textContent = ongoingProjects;
    nysTally.textContent = nysProjects;
}
// Changes the user work stats in the profile section (end) -