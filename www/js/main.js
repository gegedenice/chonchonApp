    var markers = [];
      var map;
      var infowindow;
   function initMap() {
        var apiGeolocationSuccess = function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
        map = new google.maps.Map(document.getElementById('map'), {
          center: pos,
          zoom: 17,

          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControlOptions : {
          // Liste des types autorisés
          mapTypeIds : [ google.maps.MapTypeId.ROADMAP,google.maps.MapTypeId.SATELLITE,google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN],
          // Apparence du sélecteur
          style : google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
        });

var chonchonIcon = {
    url: "img/chonchon-icon1.png", // url
    scaledSize: new google.maps.Size(30, 30)
};

        infowindow = new google.maps.InfoWindow();
        /*var infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(pos);
            infoWindow.setContent('Chonchon is here !');*/
            var marker = new google.maps.Marker({
            position: pos,
            //icon: 'http://maps.google.com/mapfiles/kml/shapes/woman.png',
            icon:chonchonIcon,
            map: map
          });
            google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<strong>Chonchon is here !</strong>');
          infowindow.open(map, this);
        });
        document.getElementById("autocomplete").addEventListener("change", myFunction);

function myFunction() {
    //var x = document.getElementById("autocomplete").value;
    var x = $("#autocomplete").val();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pos,
          radius: 500,
          type: [x]
        }, callback); }
         }
         var tryAPIGeolocation = function() {
  jQuery.post( "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBMZfjPj0DpsRb2c_3SspVkR9T8BxmKDBM", function(success) {
    apiGeolocationSuccess({coords: {latitude: success.location.lat, longitude: success.location.lng}});
  })
  .fail(function(err) {
    alert("API Geolocation error! \n\n"+err);
  });
};
tryAPIGeolocation();
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          DeleteMarkers()
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }

      function createMarker(place) {
 var gpmarker = new google.maps.MarkerImage(place.icon, null, null, null, new google.maps.Size(20, 20));
        var marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          icon: gpmarker,
          //icon:'http://maps.google.com/mapfiles/kml/paddle/blu-circle.png',
          position: place.geometry.location
        });

         markers.push(marker);
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent('<div><p><strong>'+place.name+'</strong></p><p>('+place.types+')</p><p>'+place.vicinity+'</p></div');
          infowindow.open(map, this);
        });
      }
function DeleteMarkers(){
    for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
        markers = [];
}
