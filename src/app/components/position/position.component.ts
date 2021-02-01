import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-position',
    templateUrl: './position.component.html',
    styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

    // zoom = 12;
    center: google.maps.LatLngLiteral;
    options: google.maps.MapOptions = {
        mapTypeId: 'roadmap',
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 8,
    };

    coords: any[] = [];

    constructor() {
    }

    ngOnInit(): void {

        navigator.geolocation.getCurrentPosition((position) => {
            this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            this.coords.push({
                position: {...this.center},
                label: {
                    color: 'red',
                    text: 'No visitas desde aqui!!!'
                },
                options: {animation: google.maps.Animation.BOUNCE}
            });

        });

    }

}
