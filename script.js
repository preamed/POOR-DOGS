// Event Listener für das Scrollen
window.onscroll = function () {
    changeNavbarState();
};

// Funktion zum Überprüfen des Scrollens und zum Ändern der Navbar und des Logos
function changeNavbarState() {
    const navbar = document.querySelector('.navbar');
    const logoContainer = document.getElementById('logo-container');
    const navText = document.querySelectorAll('.nav-text');
    const navIcon = document.querySelectorAll('.nav-icon');
    
    // Prüfen, ob der Benutzer gescrollt hat
    if (window.scrollY > 0) {
        navbar.classList.add('sticky'); // Fügt die Klasse 'sticky' hinzu, wenn gescrollt
        // Logo auf schwarz ändern
        logoContainer.style.backgroundImage = "url('images/logo-black.svg')";
        
        // Navbar-Hintergrund auf weiß setzen
        navbar.style.backgroundColor = "white"; 
        // Text und Icons auf schwarz setzen
        navText.forEach(item => item.style.color = "black");
        navIcon.forEach(item => item.style.color = "black");
        
    } else {
        navbar.classList.remove('sticky'); // Entfernt die Klasse 'sticky', wenn nicht gescrollt
        // Logo auf weiß zurücksetzen
        logoContainer.style.backgroundImage = "url('images/logo-white.svg')";
        
        // Navbar-Hintergrund transparent setzen
        navbar.style.backgroundColor = "transparent";
        // Text und Icons zurück auf weiß setzen
        navText.forEach(item => item.style.color = "white");
        navIcon.forEach(item => item.style.color = "white");
    }
}

// Event Listener für Hover-Effekte auf der Navbar
const navbar = document.querySelector('.navbar');
const logoContainer = document.getElementById('logo-container');
const navText = document.querySelectorAll('.nav-text');
const navIcon = document.querySelectorAll('.nav-icon');

// Ändert das Logo auf schwarz, wenn die Navbar gehovt wird
navbar.addEventListener('mouseover', function () {
    logoContainer.style.backgroundImage = "url('images/logo-black.svg')";
    navbar.style.backgroundColor = "white"; // Hintergrund weiß bei Hover
    // Text und Icons auf schwarz setzen
    navText.forEach(item => item.style.color = "black");
    navIcon.forEach(item => item.style.color = "black");
});

// Setzt das Logo zurück auf weiß, wenn der Hover-Effekt endet
navbar.addEventListener('mouseout', function () {
    if (window.scrollY === 0) { // Wenn der Benutzer nicht gescrollt hat, bleibt es weiß
        logoContainer.style.backgroundImage = "url('images/logo-white.svg')";
        navbar.style.backgroundColor = "transparent"; // Hintergrund transparent
        navText.forEach(item => item.style.color = "white");
        navIcon.forEach(item => item.style.color = "white");
    }
});

function hideBanner() {
    document.getElementById('cookie-consent-banner').style.display = 'none';
}

if (localStorage.getItem('consentMode') === null) {

    document.getElementById('btn-accept-all').addEventListener('click', function() {
        setConsent({
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true
        });
        hideBanner();
    });
    document.getElementById('btn-accept-some').addEventListener('click', function() {
        setConsent({
            necessary: true,
            analytics: document.getElementById('consent-analytics').checked,
            preferences: document.getElementById('consent-preferences').checked,
            marketing: document.getElementById('consent-marketing').checked
        });
        hideBanner();
    });
    document.getElementById('btn-reject-all').addEventListener('click', function() {
        setConsent({
            necessary: false,
            analytics: false,
            preferences: false,
            marketing: false
        });
        hideBanner();
    });
    document.getElementById('cookie-consent-banner').style.display = 'block';
}

function setConsent(consent) {
    const consentMode = {
        'functionality_storage': consent.necessary ? 'granted' : 'denied',
        'security_storage': consent.necessary ? 'granted' : 'denied',
        'ad_storage': consent.marketing ? 'granted' : 'denied',
        'analytics_storage': consent.analytics ? 'granted' : 'denied',
        'personalization_storage': consent.preferences ? 'granted' : 'denied',
    };
    gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
}