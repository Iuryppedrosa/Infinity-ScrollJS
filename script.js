//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const count = 10;
const apiKey = "N_c7sSuy8l4WYiG1XgDd3-Nq0HAyMerp_j9FBoLJ2HA";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

function imageLoader() {
  imageLoaded++;
  console.log("imageLoaded", imageLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready", ready);
  }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// elements for links and photos and add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photoArray.length;
  console.log("totalImages", totalImages);
  photoArray.forEach((photo) => {
    //create <a> to link to unsplash
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");

    // create <img> for photo
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    // Event listener, check when each is finished loading
    img.addEventListener("load", () => {
      imageLoader();
    });

    // put img inside <a> and put both inside imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// get photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photoArray = await response.json();
    console.log(photoArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});
getPhotos();
