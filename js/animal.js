/* Animal Sounds
  Vanilla JavaScript w/ Fetch API
  Created by Marlon Clark
 */

"use strict";
// Main images section
const main_imgs = document.getElementById("images");
// Animal images class
const animal_class = document.images;
// Pop-up animal name
const animal_name = document.getElementById("animal_name");
// Modal for animal name
const modal = document.getElementById("modal");
// Audio element
const sound = document.getElementById("sound");

// Fetch animal json to insert animal names
(async function() {
  await fetch("./json/animals.json")
    .then(res => res.json())
    .then(data => {
      let allImages = "";
      // Loop through json for animal names
      data.forEach(animal => {
        allImages += `<img class='animal' id='${animal.name}' 
        src='./img/${animal.name}.webp' 
        alt='${animal.name} ${animal.emoji}' onerror='getJPG("${animal.name}")'/>`;
      });
      // Render animal images
      main_imgs.innerHTML = allImages;
    });
})();

// Play animal sound and display name modal
async function showName(e) {
  let name = e.target.id;
  let fun_name = e.target.alt;
  if (name == "images") {
    // if background is clicked do nothing
  } else {
    animal_name.innerHTML = fun_name;
    modal.style.display = "block";
    sound.setAttribute("src", `/sounds/${name}.mp3`);
    sound.play();
  }
}
main_imgs.addEventListener("click", showName, false);
// Close modal
modal.addEventListener(
  "click",
  function() {
    modal.style.display = "none";
  },
  false
);

// Use .jpg image when webp not supported
function getJPG(animal) {
  document.getElementById(`${animal}`).src = `./img/${animal}.jpg`;
}
