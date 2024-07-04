//https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY

const count = 10;
const apiKey = "N_c7sSuy8l4WYiG1XgDd3-Nq0HAyMerp_j9FBoLJ2HA";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// get photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
getPhotos();
