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


// Cookie Consent Banner
document.addEventListener('DOMContentLoaded', function () {
    const consentBanner = document.getElementById('cookie-consent-banner');
    const acceptAllButton = document.getElementById('accept-all-cookies');
    const rejectAllButton = document.getElementById('reject-all-cookies');
    const settingsButton = document.getElementById('cookie-settings');
        
    // Überprüfen, ob der Benutzer bereits seine Zustimmung gegeben hat
    const consentGiven = localStorage.getItem('cookie-consent');
        
    if (!consentGiven) {
        consentBanner.style.display = 'block'; // Zeigt den Banner, wenn keine Entscheidung getroffen wurde
    }
        
    acceptAllButton.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'granted'); // Speichert die Zustimmung des Nutzers
        setConsent('granted'); // Aktiviert Google Analytics
        //consentBanner.style.display = 'none'; // Versteckt den Banner
    });

    rejectAllButton.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'denied'); // Speichert die Ablehnung des Nutzers
        setConsent('denied'); // Deaktiviert Google Analytics
        //consentBanner.style.display = 'none'; // Versteckt den Banner
    });
});

// Funktion zur Aktualisierung des Google Consent Modus
function setConsent(consentStatus) {
    window.gtag = window.gtag || function () {
        dataLayer.push(arguments);
    };
    window.dataLayer = window.dataLayer || [];
    
    if (consentStatus === 'granted') {
        gtag('consent', 'update', {
            'ad_storage': 'granted', // Werbespeicher
            'analytics_storage': 'granted', // Analyse-Speicher
            'personalization_storage': 'granted', // Personalisierungs-Speicher
            'functional_storage': 'granted', // Funktionalitäts-Speicher
            'security_storage': 'granted', // Sicherheits-Speicher
            'ad_personalizazion': 'granted'
        });
    } else {
        gtag('consent', 'update', {
            'ad_storage': 'denied', // Keine Werbung
            'analytics_storage': 'denied', // Keine Analyse
            'personalization_storage': 'denied', // Keine Personalisierung
            'functional_storage': 'denied', // Keine Funktionalität
            'security_storage': 'denied',
            'ad_personalizazion': 'denied'
        });
    }
}