const Models = ['Merida', 'Kona', 'Yeti', 'Marin', 'Cannondale', 'Specialized', 'Trek', 'Santa Cruz', 'GT Bikes', 'Giant'];
const Functions = ['Road', 'Touring', 'BMX', 'Hybrid Trekking', 'Cruiser', 'Hybrid City', 'Hybrid Comfort', 'Flat Bar', 'Cyclo-cross', 'Racing'];
const Owners = ['Barbro Aristarchos', 'Carmina Kenneth', 'Deirdre Sophos', 'Haunani Antipatros', 'Iulianus Cornell', 'Sherri Aleksi', 'Emma Jalil', 'Beathan Meiriona', 'Alfher Tziporah', 'Raina Monroe'];
let vlat, vlon;
// Get current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
    vlat = position.coords.latitude;
    vlon = position.coords.longitude;
    });
  } else { 
    vlat = 43.6629;
    vlon = -79.3957;
  }

let map, datasource, client, popup;

let GetMap = () => {
  //Add your Azure Maps subscription key to the map SDK. Get an Azure Maps key at https://azure.com/maps
  atlas.setSubscriptionKey('xx1k0hE_ZgnkoUnL5jqfYDK_9azswhfjNkFJFWw89Yw');

  //Initialize a map instance.
  map = new atlas.Map('myMap');

  //Wait until the map resources have fully loaded.
  map.events.add('load', function () {

    //Create a data source and add it to the map.
    datasource = new atlas.source.DataSource();
    map.sources.add(datasource);

    //Add a layer for rendering point data.
    var resultLayer = new atlas.layer.SymbolLayer(datasource, null, {
      iconOptions: {
        iconImage: 'pin-round-darkblue',
        anchor: 'center',
        allowOverlap: true
      }
    });

    map.layers.add(resultLayer);

    //Create an instance of the services client.
    client = new atlas.service.Client(atlas.getSubscriptionKey());
    
    //Execute a POI search query then add the results to the map.
    client.search.getSearchPOI('cafe', {
      lat: 43.6629,
      lon: -79.3957,
      radius: 100000
    })
    .then(response => {
      //Parse the response into GeoJSON so that the map can understand.
      var geojsonResponse = new atlas.service.geojson.GeoJsonSearchResponse(response);
      var results = geojsonResponse.getGeoJsonResults();

      //Add the results to the data source so they can be rendered. 
      datasource.add(results);

      // Set the camera bounds
      map.setCamera({
          bounds: results.bbox,
          padding: 50
      });
    });

    //Create a popup but leave it closed so we can update it and display it later.
    popup = new atlas.Popup();
    
    //Add a click event to the result layer and display a popup when this event fires.
    map.events.add('click', resultLayer, showPopup);
  });
}

let showPopup = (e) => {
  //Get the properties and coordinates of the first shape that the event occured on.
  let p = e.shapes[0].getProperties();
  let bike = create_bike();
  let position = e.shapes[0].getCoordinates();

  console.log(bike)

  //Create HTML from properties of the selected result.
  var html = ['<div><b>', p.address.freeformAddress,
    '</b><p>Bike Function: ' + bike.function + '<br>',
    'Bike Model: ' + bike.model + '<br>',
    'Bike Owner: ' + bike.owner.name + '</p>',
    '</div><div id="btn"></div></div>'];

  //Update the content and position of the popup.
  popup.setOptions({
    content: html.join(''),
    position: position
  });

  //Open the popup.
  popup.open(map);

          
  let booking_popup = document.createElement('a');
  booking_popup.textContent = 'Book this bike!';
  booking_popup.href = '#log-in-modal';
  booking_popup.className = 'map-entity';
  booking_popup.id = 'map';
  booking_popup.addEventListener('click', () => {
    $.magnificPopup.open({
      items: {
          src: '#log-in-modal'
      },
      closeOnContentClick : false, 
      closeOnBgClick :true, 
      showCloseBtn : true, 
      enableEscapeKey : true
      // closeMarkup: '<button class="mfp-close mfp-new-close" type="button" title="Close (Esc)"> { costume button with close icon image } </button>'
    });
  });

  let submit_btn = document.createElement('a');
  submit_btn.textContent = 'Book this bike!';
  submit_btn.className = 'btn btn-primary btn-lg rounded-pill';
  submit_btn.addEventListener('click', () => {
    let 
      renter_name = id('name').value,
      renter_email = id('email').value,
      renter_phone = id('phone').value;

    // deMorgan's law in action ;)
    if (!(exists(renter_name) && exists(renter_email) && exists(renter_phone))) {
      alert('enter all details!');
      return;
    }
    console.log(renter_name);
  });

  id('bike_function').innerHTML = bike.function;
  id('bike_model').innerHTML = bike.model;
  id('bike_owner').innerHTML = bike.owner.name;

  id('btn').appendChild(booking_popup);
  id('submit_btn').appendChild(submit_btn);
}

/* Utilities */

let create_bike = () => {
  // TODO: Add bike picture
  // TODO: Add comments

  return {
    id: random_id(),
    model: random_bike_model(),
    function: random_bike_function(),
    owner: random_owner()
  };
};

let random_bike_model = () => {
  return Models[Math.floor(Math.random() * 10)];
};

let random_bike_function = () => {
  return Functions[Math.floor(Math.random() * 10)];
};

let random_owner = () => {
  return {
    id: random_id(),
    name: Owners[Math.floor(Math.random() * 10)]
  }
};

let random_id = () => {
  return Math.random().toString(36).substring(8);
}

let exists = (thing) => {
  if (thing !== undefined && thing !== null && thing !== '') return true;
  return false;
}

let id = (element) => {
  return document.getElementById(element);
}
