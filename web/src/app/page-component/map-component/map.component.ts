import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import 'leaflet';
import {FormBuilder, FormGroup} from '@angular/forms';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {
  map: any;
  formSearch: FormGroup;
  @ViewChild('btnTest', {static: true}) btnTest!: TemplateRef<any>;

  constructor(private fb: FormBuilder) {
    this.formSearch = this.fb.group({
      search: ['']
    });
  }

  ngOnInit(): void {
    const {latitude, longitude} = {latitude: 21.223441002279806, longitude: 105.74922787735994};
    this.map = L.map('map', {
      zoomControl: false,
      attributionControl: false,
      zoomDelta: 0.25,
      zoomSnap: 0
    });
    // add zoom control with your options
    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);

    L.control.scale().addTo(this.map);

    const wmsLayer = L.tileLayer.wms('http://localhost:8081/geoserver/wms', {
      service: 'WMS',
      version: '1.1.0',
      request: 'GetMap',
      layers: ['osm-vn-1'],
      transparent: true
    });
    this.map.setView([latitude, longitude], 13);
    this.map.addLayer(wmsLayer);


    const command = L.control({position: 'topright'});
    //
    command.onAdd = () => {
      const divContainer = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      divContainer.innerHTML = ` <a type="button" title="Vị trí của bạn">
                                <img src="./assets/images/icon/gps_1.png" class="center">
                                </a>`;
      return divContainer;
    };
    // //
    const div = command.addTo(this.map);
    // L.DomUtil.setOpacity(div._container, 0.5);
    // const container = div._container as HTMLElement;
    // // console.log(this.btnTest.nativeElement.previousElementSibling);
    // console.log('btnTest', this.btnTest);
    // container.insertAdjacentElement('beforebegin', this.luaTest.nativeElement.previousElementSibling as Element);

    // div._container.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     console.log('div._container.');
    // });
    // const btn = div._container.querySelector('#submitSearch') as HTMLElement;
    // btn.addEventListener('click', (event) => {
    //     event.preventDefault();
    //     event.stopPropagation();
    //     console.log('#submitSearch');
    //     console.log(this.formSearch.value);
    // });
  }

  ngAfterViewInit(): void {

  }

  btnClick(event: MouseEvent): void {
    console.log(1111);
  }

  handlerSearch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    console.log(this.formSearch.value);

  }
}
