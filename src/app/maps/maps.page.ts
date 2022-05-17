import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { LoadingController } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {
  mapRef = null;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  destination = { lat: 25.447264, lng: -102.200719 };
  constructor(    private geolocation: Geolocation,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {  this.loadMap();
  }


  async loadMap() {
    const loading = await this.loadingCtrl.create();
    loading.present();
    const myLatLng = await this.getLocation();
    const mapEle: HTMLElement = document.getElementById('map');
    this.mapRef = new google.maps.Map(mapEle, {
      center: this.destination,
      zoom: 12
    });
    this.directionsDisplay.setMap(this.mapRef);
    google.maps.event
    .addListenerOnce(this.mapRef, 'idle', () => {
      loading.dismiss();
      this.addMaker(myLatLng.lat, myLatLng.lng);
      this.addMaker(this.destination.lat, this.destination.lng);
      mapEle.classList.add('show-map');
      this.calculateRoute();
    });
  }


  private addMaker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
    });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      lat: rta.coords.latitude,
      lng: rta.coords.longitude
    };
  }

  private calculateRoute() {
    this.directionsService.route({
      origin: this.getLocation,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    }, (response:any, status: any)  => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
    }
    



}
