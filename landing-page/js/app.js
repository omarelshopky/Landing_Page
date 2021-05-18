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


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// add section name to fragment to add leter to Navbar
function addSectionToFragment(name){
    const listTag = document.createElement('li');
    listTag.textContent = name;
    fragment.appendChild(listTag);
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavBar(SEC){
    for(const section of SEC){
        const secName = section.getAttribute('data-nav');
        addSectionToFragment(secName);
    }
    navBar.appendChild(fragment);
}

buildNavBar(sections);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click

// Set sections as active


