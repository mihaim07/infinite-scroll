const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 5;
const apiKey = '6Ya6JHb9GTeLl2ISCUjw6CktQQi_RFLe9zIdVRXbPWM';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    console.log('image loaded');
    imagesLoaded++;
    if (imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready=', ready);
    }
}

// Helper Function To Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('totalImages',totalImages);
    console.log('total images=', totalImages)
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        console.log('1');
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.urls.raw,
            target: '_blank',
        });
        // item.setAttribute('href', photo.urls.raw);
        // item.setAttribute('target',  '_blank'); //_blank -> open in new tab
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error){
        // Catch error here
    }
}

// Check to see if scrolling near bottom of page, Load more Photos

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)  {
            ready = false;
            getPhotos();
        }
    })


// On Load
getPhotos();