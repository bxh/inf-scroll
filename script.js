const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photos = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

function renderPhotos() {
    totalImages += photos.length;
    photos.forEach((p) => {
        const item = document.createElement('a');
        item.setAttribute('href', p.links.html);
        item.setAttribute('target', '_blank');
        
        const img = document.createElement('img');
        img.setAttribute('src', p.urls.regular);
        img.setAttribute('alt', p.alt_description);
        img.setAttribute('title', p.alt_description);
        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Unsplash API
const count = 20;
const apiKey = 'uUJfhhLcfkxE5kh6IXKJWUohCf0iDLqlu42vrjBMpgQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photos = await response.json();
        renderPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        ready = false;
        getPhotos();
    }
});

getPhotos();
