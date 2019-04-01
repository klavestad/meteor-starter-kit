import './map.html'

Template.user_map.onRendered(function () {

    let div = document.getElementById("leafletParent");
    let canvas = document.getElementById("userLocation");
    canvas.height = div.offsetHeight;
    canvas.width = div.offsetWidth;


    let map = new L.map('userLocation');
    map.setView([59.922650, 10.751226], 13);
    L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images/';
    L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {}).addTo(map);
})