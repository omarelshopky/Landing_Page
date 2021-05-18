/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const navBar = document.getElementById('navbar__list');
const sections = [...document.querySelectorAll('section')];
const ScrollUpButton = document.getElementById("ScrollUpButton");
let lastActiveSection = sections[0];
const activeClass = 'active';


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * @description add section name to fragment to add leter to Navbar
 * @param {string} name Section name will be shown in navBar
 * @param {string} ID Section ID to create section navList ID
 */
function addSectionToFragment(name, ID) {
    const listTag = document.createElement('li');
    listTag.textContent = name;
    listTag.id = ID + 'nav';
    listTag.addEventListener('click', scrollDownToSection);
    if(listTag.id == 'section1nav'){
        listTag.classList.add(activeClass);
    }
    fragment.appendChild(listTag);
}


/**
 * @description check if the element in Viewport or not
 * @param {*} element the element want to check its bounding
 * @returns element bounding
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


/**
 * @description add active class to this section and remove it from the last one 
 * @param {*} section the one want to be active
 */
function changeSectionActivite(section){
    if(lastActiveSection.id != section.id){
        lastActiveSection.classList.toggle(activeClass);
        document.getElementById(lastActiveSection.id + 'nav').classList.toggle(activeClass);
    }else{/* Do Nothing */}

    if(!section.classList.contains(activeClass)){
        section.classList.toggle(activeClass);
        document.getElementById(section.id + 'nav').classList.toggle(activeClass);
    }else{/* Do Nothing */}
    
    lastActiveSection = section;
}


// Scroll down until reach active section
function scrollDownToSection(event){
    const listItemId = event.target.id;
    const targetedSection = document.getElementById(listItemId.substring(0, listItemId.length - 3));
    targetedSection.scrollIntoView({behavior: "smooth"});
}


// Show the button when the user scrolls down 1700px from the top of the document
function activeScrollUpButton() {
    if (document.body.scrollTop > 1700 || document.documentElement.scrollTop > 1700) {
      ScrollUpButton.style.display = "block";
    } else {
      ScrollUpButton.style.display = "none";
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
(function buildNavBar(){
    for(const section of sections){
        const secName = section.getAttribute('data-nav');
        const secID = section.getAttribute('id');
        addSectionToFragment(secName, secID);
    }
    navBar.appendChild(fragment);
})(); //IIFE (Immediately Invoked Function Expression)



// Add class 'active' to section when near top of viewport
function CheckActivite(){
    if(navBar.style.display != 'block')
        navBar.style.display = 'block';
    for(const section of sections){
        if(isInViewport(section)){
            changeSectionActivite(section);
        }else{
            continue;
        }
    }

    // Hide navBar if user not scrolling at the moment
    clearTimeout();
    setTimeout(function(){
        navBar.style.display = 'none';
    }, 10000);

    activeScrollUpButton()
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Set sections as active
document.addEventListener('scroll', CheckActivite);


// When the user clicks on the button, scroll to the top of the document
ScrollUpButton.addEventListener('click', function(){
    document.getElementById('pageStart').scrollIntoView({behavior: "smooth"});
});



