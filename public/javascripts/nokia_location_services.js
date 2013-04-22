function set_Creds(){
  nokia.Settings.set("appId", "");
  nokia.Settings.set("authenticationToken", "");
}

function set_coords(position) {
         var latitude = position.coords.latitude;
         var longitude = position.coords.longitude;
         loadMap(latitude,longitude);
       }


       function loadMap(latitude, longitude) {

                    /*  Set authentication token and appid
                    * WARNING: this is a demo-only key
                    * please register on http://api.developer.nokia.com/
                    * and obtain your own developer's API key
                    */
                  set_Creds();

                    // Get the DOM node to which we will append the map
                    var mapContainer = document.getElementById("mapContainer");
                    // Create a map inside the map container DOM node
                    var map = new nokia.maps.map.Display(mapContainer, {
                      // initial center and zoom level of the map
                      center: [latitude, longitude],
                      zoomLevel:  15
                    });
               }

       function get_location() {
         navigator.geolocation.getCurrentPosition(set_coords);
       }

       function getPlaceByName(){

        searchTerm =  document.getElementById("mapContainer").innerHTML = ""

        searchTerm =  document.getElementById("search").value;

        set_Creds();

        // Get the DOM node to which we will append the map
        var mapContainer = document.getElementById("mapContainer");

        // Create a map inside the map container DOM node
        var map = new nokia.maps.map.Display(mapContainer, {
          zoomLevel:  14
        });

        var searchCenter = new nokia.maps.geo.Coordinate(0.0, 0.0),
          searchManager = nokia.places.search.manager,
          resultSet;

        // Function for receiving search results from places search and process them
        var processResults = function (data, requestStatus, requestId) {
          var i, len, locations, marker;

          if (requestStatus == "OK") {
            // The function findPlaces() and reverseGeoCode() of  return results in slightly different formats
            locations = data.results ? data.results.items : [data.location];
            // We check that at least one location has been found
            if (locations.length > 0) {
              // Remove results from previous search from the map
              if (resultSet) map.objects.remove(resultSet);
              // Convert all found locations into a set of markers
              resultSet = new nokia.maps.map.Container();
              for (i = 0, len = locations.length; i < len; i++) {
                marker = new nokia.maps.map.StandardMarker(locations[i].position, { text: i+1 });
                resultSet.objects.add(marker);
              }
              // Next we add the marker(s) to the map's object collection so they will be rendered onto the map
              map.objects.add(resultSet);
              // We zoom the map to a view that encapsulates all the markers into map's viewport
              map.zoomTo(resultSet.getBoundingBox(), false);
            } else {
              alert("Your search produced no results!");
            }
          } else {
            alert("The search request failed");
          }
        };

        /* We perform a geocode search request: translating a given address
         * into a geolocation
         */


        // Binding of DOM elements to several variables so we can install event handlers.
        var progressUiElt = document.getElementById("progress");

        progressUiElt.innerHTML = "Looking for '" + searchTerm+ "'...";
        searchManager.geoCode({
          searchTerm: searchTerm,
          onComplete: processResults
        });

       }


