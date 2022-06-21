import { Component, ElementRef, ViewChild } from '@angular/core';
declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;

  latOri = '';
  longOri = '';

  latDest = '';
  longDest = '';
  id: any = '';

  status: any = '';

  driverLat: any;
  driverLng: any;
  interval: any;

  constructor() { 
   
  }

  ngOnInit() {
    
        this.loadMap(36.726530, 10.307010, 33.882990, 10.100380);
     
  }  

  changeMarkerPosition(marker, map) {
    var latlng = new google.maps.LatLng(this.driverLat, this.driverLng);
    map.setCenter(latlng);
    marker.setPosition(latlng);
    console.log("Updating runner position");
  }

  loadMap(latOri, lngOri, latDest, lngDest) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay = new google.maps.DirectionsRenderer();
    var bounds = new google.maps.LatLngBounds;

    var origin1 = { lat: parseFloat(latOri), lng: parseFloat(lngOri) };
    var destinationA = { lat: latDest, lng: lngDest };

    var destinationIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=D|FF0000|000000';
    var originIcon = 'https://chart.googleapis.com/chart?' +
      'chst=d_map_pin_letter&chld=O|FFFF00|000000';
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: latOri, lng: lngOri },
      disableDefaultUI: true,
      zoom: 100
    });

    const custPos = new google.maps.LatLng(latOri, lngOri);
    const restPos = new google.maps.LatLng(latDest, lngDest);

    const icon = {
      url: 'assets/icon.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };
    var marker = new google.maps.Marker({
      map: map,
      position: custPos,
      animation: google.maps.Animation.DROP,
      icon: icon,
    });
    var markerCust = new google.maps.Marker({
      map: map,
      position: restPos,
      animation: google.maps.Animation.DROP,
    });
    marker.setMap(map);
    markerCust.setMap(map);

    directionsDisplay.setMap(map);
    // directionsDisplay.setOptions({ suppressMarkers: true });
    directionsDisplay.setOptions({
      polylineOptions: {
        strokeWeight: 4,
        strokeOpacity: 1,
        strokeColor: 'red'
      },
      suppressMarkers: true
    });
    var geocoder = new google.maps.Geocoder;

    var service = new google.maps.DistanceMatrixService;

    service.getDistanceMatrix({
      origins: [origin1],
      destinations: [destinationA],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, function (response, status) {
      if (status !== 'OK') {
        alert('Error was: ' + status);
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;
        var outputDiv = document.getElementById('output');
        // outputDiv.innerHTML = '';
        // deleteMarkers(markersArray);

        var showGeocodedAddressOnMap = function (asDestination) {
          var icon = asDestination ? destinationIcon : originIcon;
          return function (results, status) {
            if (status === 'OK') {
              map.fitBounds(bounds.extend(results[0].geometry.location));
              // markersArray.push(new google.maps.Marker({
              //   map: map,
              //   position: results[0].geometry.location,
              //   icon: icon
              // }));
            } else {
              alert('Geocode was not successful due to: ' + status);
            }
          };
        };

        directionsService.route({
          origin: origin1,
          destination: destinationA,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });


        for (let i = 0; i < originList.length; i++) {
          let results = response.rows[i].elements;
          geocoder.geocode({ 'address': originList[i] },
            showGeocodedAddressOnMap(false));
          for (let j = 0; j < results.length; j++) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));
          }
        }
      }
    });
    this.interval = setInterval(() => {
      this.changeMarkerPosition(marker, map);
    }, 12000);
  }
  ionViewDidLeave() {
    console.log('leaae');
    clearInterval(this.interval);
  }

  

}
