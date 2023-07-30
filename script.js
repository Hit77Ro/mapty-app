"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
//->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

let map, mapEvent;
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      // getting the current coordinates of the user
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      map = L.map("map").setView(coords, 13);
      /*
      This line creates a new Leaflet map instance and assigns it to the map constant. The map is initialized in the HTML element with the ID "map" (e.g., <div id="map"></div>). The setView method sets the initial center of the map and the zoom level. In this case, the map will be centered at latitude (coords[0]) and longitude coords[1], and the initial zoom level is set to 13.
      */

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      /* 
        This line adds a tile layer to the map. Tile layers are used to display map data in small image tiles that are fetched from a server. In this case, the tile layer uses OpenStreetMap's map tiles (provided by the URL "https://tile.openstreetmap.org/{z}/{x}/{y}.png"). The {z}, {x}, and {y} placeholders are replaced with the appropriate values for the current map view to request the corresponding tiles. The addTo(map) method attaches this tile layer to the previously created map instance.
      */

      L.marker(coords)
        .addTo(map)
        .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
        .openPopup();
      /*
          => L.marker([51.5, -0.09])
          This line creates a new marker on the map. Markers are used to represent points of interest on the map. The L.marker() method takes an array of two elements: the latitude (51.5) and longitude (-0.09) where the marker will be placed.
          => ..addTo(map) 
          This method call adds the created marker to the map, so it becomes visible.
          => .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
          The bindPopup() method associates a popup with the marker. A popup is a small overlay that displays additional information when the user clicks on the marker. In this case, the content of the mapEvent.latlng popup is a string with some HTML formatting.
          => .openPopup()
          Finally, the openPopup() method is called to automatically open the popup when the page loads. The popup will show "A pretty CSS3 popup. Easily customizable." as its content.
        */

      /* positionning the marker when ,where  user  click on the map*/
      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
        // getting current clicking position(latitude  , longitude) coords
        const { lat, lng } = mapEvent.latlng;
        L.marker([lat, lng], { opacity: 0.4, shadowPan: "shadowPane" })
          .addTo(map)
          .bindPopup(
            // customize popup of the marker
            L.popup({
              maxWidth: 250,
              minWidth: 100,
              autoClose: false,
              closeOnClick: false,
              className: "running-popup",
            })
          )
          .setPopupContent("workout")
          .openPopup();
      }); // end of map click event listener
    },
    function () {
      alert("couldn't get your location");
    }
  );
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // clearing input fields on submit
  [...form.children].forEach((input) => (input.value = ""));
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng], { opacity: 0.4, shadowPan: "shadowPane" })
    .addTo(map)
    .bindPopup(
      // customize popup of the marker
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("workout")
    .openPopup();
});

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
