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
function addSectionToFragment(name, ID){
    const listTag = document.createElement('li');
    listTag.textContent = name;
    listTag.id = ID + 'nav';
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


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(){
    for(const section of sections){
        const secName = section.getAttribute('data-nav');
        const secID = section.getAttribute('id');
        addSectionToFragment(secName, secID);
    }
    navBar.appendChild(fragment);
}

buildNavBar(sections);


// Add class 'active' to section when near top of viewport
function CheckActivite(){
    for(const section of sections){
        if(isInViewport(section)){
            changeSectionActivite(section);
        }else{
            continue;
        }
    }
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', CheckActivite);

