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
        consentBanner.style.display = 'none'; // Versteckt den Banner
    });

    rejectAllButton.addEventListener('click', function () {
        localStorage.setItem('cookie-consent', 'denied'); // Speichert die Ablehnung des Nutzers
        setConsent('denied'); // Deaktiviert Google Analytics
        consentBanner.style.display = 'none'; // Versteckt den Banner
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
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
            });
    } else {
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
            });
    }
}

// Array mit den Bildquellen für die Produktbilder
const images = [
    'images/product_images/tshirt-frontview.jpg',
    'images/product_images/tshirt-sideview.jpg',
    'images/product_images/tshirt-backview.jpg',
    'images/product_images/tshirt-only.jpg'
];
let currentImageIndex = 0;

// Funktion zum Ändern des Hauptbildes und zum Hervorheben des Thumbnails
function changeMainImage(imageSrc) {
    // Ändere das Hauptbild
    document.getElementById('mainImage').src = imageSrc;

    // Entferne die 'selected' Klasse von allen Thumbnails
    let thumbnails = document.querySelectorAll('.thumbnail-img');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.classList.remove('selected');
    });

    // Füge die 'selected' Klasse zum Thumbnail des aktuellen Bildes hinzu
    let currentThumbnail = Array.from(thumbnails).find(function(thumbnail) {
        return thumbnail.src.includes(imageSrc);
    });
    if (currentThumbnail) {
        currentThumbnail.classList.add('selected');
    }
}

// Initiale Markierung des ersten Thumbnails
document.addEventListener('DOMContentLoaded', function() {
    let firstThumbnail = document.querySelector('.thumbnail-img');
    if (firstThumbnail) {
        firstThumbnail.classList.add('selected');
    }
});


// Nächstes Bild anzeigen
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeMainImage(images[currentImageIndex]);
}

// Vorheriges Bild anzeigen
function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeMainImage(images[currentImageIndex]);
}

// Funktion zum Auswählen der Farbe und zum Hinzufügen der Umrandung
function selectColor(color) {
    // Entferne die 'selected' Klasse von allen Farbfeldern
    let colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(function(option) {
        option.classList.remove('selected');
    });

    // Füge die 'selected' Klasse zum ausgewählten Farbfeld hinzu
    let selectedColor = Array.from(colorOptions).find(function(option) {
        return option.style.backgroundColor === color;
    });

    if (selectedColor) {
        selectedColor.classList.add('selected');
    }

    // Hier kannst du zusätzliche Aktionen hinzufügen, wie z.B. das Produktbild ändern,
    // wenn die Farbe des Produkts mit dem Farbfeld übereinstimmt
    // changeMainImage('path_to_image_for_' + color);  // Beispiel, um Bild nach Farbe zu ändern
}

// Initiale Markierung des ersten Farbfelds (optional)
document.addEventListener('DOMContentLoaded', function() {
    let firstColorOption = document.querySelector('.color-option');
    if (firstColorOption) {
        firstColorOption.classList.add('selected');
    }
});

// Hinzufügen der "selected" Klasse beim Klicken auf einen Button
const sizeButtons = document.querySelectorAll('.btn-group .btn');

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Entfernt die "selected" Klasse von allen Buttons
        sizeButtons.forEach(btn => btn.classList.remove('selected'));
        // Fügt die "selected" Klasse zum angeklickten Button hinzu
        button.classList.add('selected');
    });
});

    gtag('event', 'button_click', {
        'event_category': 'engagement',
        'event_label': 'Shop Now',
        'value': 1
    });