
const headerBar = document.querySelector("section#header-bar");
const subHeader = document.querySelector("section#sub-header");
window.addEventListener("scroll", checkScroll);

const hamburger = document.querySelector("#hamburger button");
const sidebar = document.querySelector("section#sidebar");
    hamburger.addEventListener("click", toggleSidebar);

const contentDividerBar = document.querySelector("section#content-divider");
const contentDividerButtons = document.querySelectorAll("section#content-divider button");
    contentDividerButtons.forEach(button => {
        button.addEventListener("click", toggleContentPage);
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
    } else {
        contentDividerBar.classList.remove("fixed");
    }

}