import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import 'leaflet';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {PageEvent} from '@angular/material/paginator';
import {BehaviorSubject, fromEvent, Observable, of, Subject} from 'rxjs';
import {
  getArrayCityProvinceState,
  getArrayCommuneWardState,
  getArrayDistrictState,
  getArrayLocationSearchState, getArrayLocationState,
  getArrayObjectTypeState, getLocationEntitiesState, getLocationSearchEntitiesState,
  getObjectTypeEntitiesState,
  LoadCityProvince,
  LoadCommuneWardByDistrict,
  LoadDistrictByCityProvince, LoadLocationDetail,
  LoadObjectType,
  LoadPageLocation, LoadViewLocation, RemoveLocation,
  RemoveObjectType, SaveLocation,
  SaveObjectType
} from '../../store';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import {tap, map, take, switchMap, takeUntil, skip, filter} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {MatSelectionList, MatSelectionListChange} from '@angular/material/list';
import {getPrefixID} from '../../constans/prefix-id.const';
import {DOMAIN_SERVER} from '../../constans/url-api.const';
import {startsWith} from 'lodash';
import * as _ from 'lodash';
import {SelectionModel} from '@angular/cdk/collections';

declare let L: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  isDialog = false;
  initLocationID!: number;
  private latLng = new BehaviorSubject<{ id: number, latLng: number[] }>({
    id: 0,
    latLng: [21.223441002279806, 105.74922787735994]
  });
  // private initLat!: number;
  // private initLng!: number;
  public readonly LOCATION = 'LOCATION';
  public readonly OBJECT_TYPE = 'OBJECT_TYPE';
  params: any = {};
  formData: FormData = new FormData();
  map: any;
  formSearch: FormGroup;
  formLocation: FormGroup;
  formObjectType: FormGroup;
  @ViewChild('btnTest', {static: true}) btnTest!: TemplateRef<any>;
  @ViewChild('dialogObjectType', {static: true}) dialogObjectType!: TemplateRef<any>;
  @ViewChild('matSelectionObjectType', {static: true}) matSelectionObjectType!: MatSelectionList;
  @ViewChild('matSelectionLocation', {static: true}) matSelectionLocation!: MatSelectionList;
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild('dialogDelete', {
    static: true
  }) dialogDelete!: TemplateRef<any>;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];
  totalRecord = 0;
  resultSearch$!: Observable<any[]>;
  resultView$!: Observable<any[]>;
  objectTypes$!: Observable<any[]>;
  public cityProvince$!: Observable<any[]>;
  public district$!: Observable<any[]>;
  public communeWard$!: Observable<any[]>;
  public linkImage$ = new BehaviorSubject<any>({name: ''});
  isNewObjectType$ = new BehaviorSubject<boolean>(true);
  isNewLocation$ = new BehaviorSubject<boolean>(true);
  private markerClick: any;
  listIcon: any[] = [];
  icon: any;
  typeObject: any[] = [];
  listMarker: any[] = [];
  private destroy = new Subject();
  public oldData: any = null;
  mapMarker = new Map<number, any>();
  outputData: {
    location: string | null,
    locationID: number | null
  } = {location: null, locationID: null};

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private store: Store<fromStore.FeatureState>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    this.isDialog = !_.isEmpty(dataDialog);
    if (this.isDialog) {
      this.initLocationID = dataDialog.locationID;
      if (this.initLocationID) {
        this.store.dispatch(new LoadLocationDetail(dataDialog.locationID));
        this.store.select(getLocationEntitiesState)
          .pipe(
            map((entities) => entities[getPrefixID(dataDialog.locationID)]),
            filter(data => !!data),
            take(1)
          )
          .subscribe(data => {
            this.latLng.next({id: dataDialog.locationID, latLng: [data.latitude, data.longitude]});
          });
      }
    }

    this.formSearch = this.fb.group({
      name: ['']
    });

    this.formLocation = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      objectTypeID: [null, Validators.required],
      latitude: [null, Validators.required],
      longitude: [null, Validators.required],
      cityProvinceID: ['', Validators.required],
      districtID: ['', Validators.required],
      communeWardID: ['', Validators.required],
      description: ['']
    });

    this.formObjectType = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      image: ['']
    });
  }

  get valueSelector(): Observable<any> {
    return this.store.select(getObjectTypeEntitiesState)
      .pipe(
        map(value => value[getPrefixID(this.formLocation.get('objectTypeID')?.value)]),
        map(data => {
          if (data) {
            return {...data, image: `${DOMAIN_SERVER}/${data?.image}`};
          }
          return null;
        })
      );
  }

  ngOnInit(): void {
    const {lat, lng} = {lat: 21.223441002279806, lng: 105.74922787735994};
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

    this.map.setView([lat, lng], 13);
    this.map.addLayer(wmsLayer);
    this.loadView();


    const command = L.control({position: 'topright'});
    //
    command.onAdd = () => {
      const divContainer = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
      divContainer.innerHTML = ` <a type="button" title="Vị trí của bạn" id="current_location">
                                    <img src="./assets/images/icon/gps_1.png" class="center">
                                </a>`;
      return divContainer;
    };
    // //
    const div = command.addTo(this.map);
    const container = div._container as HTMLElement;

    fromEvent(container.querySelector('#current_location') as HTMLButtonElement, 'click')
      .pipe(
      )
      .subscribe((e) => {
        e.stopPropagation();
        navigator.geolocation.getCurrentPosition((pos) => {
          const {latitude, longitude} = pos.coords;
          this.map.setView([latitude, longitude], 13);
          this.markerClick?.remove();
          this.markerClick = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup(`<p>vĩ độ : ${latitude}<br />kinh độ : ${longitude}.</p>`).openPopup();
          this.formLocation.patchValue({
            latitude,
            longitude
          });
        });
      });
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


    this.resultSearch$ = this.store.select(getArrayLocationSearchState);

    this.store.dispatch(new LoadObjectType(null));
    this.objectTypes$ = this.store.select(getArrayObjectTypeState);

    (this.formLocation.get('objectTypeID') as FormControl)?.valueChanges
      .subscribe(value => {
        const index = this.typeObject.findIndex(x => x.id === value);
        // this.imageTypeObject = this.typeObject[index].icon;
        this.icon = this.listIcon[index];
      });


    this.store.dispatch(new LoadCityProvince(null));
    this.cityProvince$ = this.store.select(getArrayCityProvinceState);
    this.district$ = this.store.select(getArrayDistrictState);
    this.communeWard$ = this.store.select(getArrayCommuneWardState);

    this.objectTypes$.subscribe(data => {
      this.typeObject = data;
      this.listIcon = [];
      data.forEach(value => {
        const icon = new IconExtend({iconUrl: value?.image});
        this.listIcon.push(icon);
      });
    });

    this.formLocation.get('cityProvinceID')?.valueChanges
      .subscribe(val => this.store.dispatch(new LoadDistrictByCityProvince(val)));
    this.formLocation.get('districtID')?.valueChanges
      .subscribe(val => this.store.dispatch(new LoadCommuneWardByDistrict(val)));

    const idControl = this.formObjectType.get('id') as FormControl;
    idControl.valueChanges.pipe(
      map(data => !data)
    ).subscribe(isNew => this.isNewObjectType$.next(isNew));
    const idControlLocation = this.formLocation.get('id') as FormControl;
    idControlLocation.valueChanges
      .pipe(
        map(data => !data)
      ).subscribe(isNew => this.isNewLocation$.next(isNew));

  }

  loadView(): void {
    const {_northEast, _southWest} = this.map.getBounds();
    // console.log(this.map.getZoom());
    if (this.map.getZoom() <= 11) {
      this.clearAllMarker();
      return;
    }
    this.store.dispatch(new LoadViewLocation({
      northEastLat: _northEast.lat,
      northEastLng: _northEast.lng,
      southWestLat: _southWest.lat,
      southWestLng: _southWest.lng
    }));
  }

  ngAfterViewInit(): void {

    this.map.addEventListener('click', (e: any) => {
      this.markerClick?.remove();
      const {lat, lng} = e.latlng;
      if (this.icon) {
        this.markerClick = L.marker([lat, lng], {icon: this.icon});
      } else {
        this.markerClick = L.marker([lat, lng]);
      }
      this.markerClick.addTo(this.map)
        .bindPopup(`<p>vĩ độ : ${lat}<br />kinh độ : ${lng}.</p>`).openPopup();
      this.formLocation.patchValue({
        latitude: lat,
        longitude: lng
      });
    });

    fromEvent(this.map, 'moveend')
      .pipe(
        tap((e: any) => {
          this.loadView();
        })
      ).subscribe();

    setTimeout(() => {
      this.latLng.subscribe(data => {
        // console.log(data);
        // console.log({...this.typeObject});
        this.viewMap(data.id, data.latLng[0], data.latLng[1]);
      });
    });

    this.markerAll();
  }

  markerAll(): void {
    this.store.select(getArrayLocationState).subscribe(data => {
      // this.listMarker.forEach(item=>{
      //   item.remove();
      // })
      // this.listMarker=[];
      data?.forEach((item: any) => {
        this.markerItem(item);
      });
    });
  }

  markerItem(item: any): void {
    if (item.objectTypeID) {
      const index = this.typeObject.findIndex(x => x.id === item.objectTypeID);
      // console.log('this.typeObject', this.typeObject);
      this.markerMapIcon(item.id, item.latitude, item.longitude, this.map, this.listIcon[index],
        `<p data-id='${item.id}'>${item.name}
                  <br/>
                  ${item.communeWardName || '...'}
                  <br/>
                  ${item.districtName || '...'}
                  <br/>
                  ${item.cityProvinceName || '...'}
                  </p>`);
    } else {
      this.markerMapIcon(item.id, item.latitude, item.longitude, this.map, null,
        `<p data-id='${item.id}'>${item.name}
                  <br/>
                  ${item.communeWardName || '...'}
                  <br/>
                  ${item.districtName || '...'}
                  <br/>
                  ${item.cityProvinceName || '...'}
                  </p>`);
    }
  }

  clearAllMarker(): void {
    const it = this.mapMarker.keys();
    let item = it.next();
    while (!item.done) {
      const value = this.mapMarker.get(item.value);
      value?.remove();
      item = it.next();
    }
    this.mapMarker.clear();
    // this.listMarker?.forEach(item => {
    //   item?.remove();
    // });
    // this.listMarker = [];
  }

  markerMapIcon(id: number, lat: number, lng: number, mapTemp: any, icon?: any, contentPopup?: string): void {
    // if (this.getMarkerInListMarkerByLatLng(lat, lng)) {
    //   return;
    // }
    if (this.getMarkerInListMarkerByID(id)) {
      return;
    }

    let marker;
    if (icon) {
      marker = L.marker([lat, lng], {icon});
    } else {
      marker = L.marker([lat, lng]);
    }
    marker.addTo(mapTemp)
      .bindPopup(contentPopup || `<p>vĩ độ : ${lat}<br />kinh độ : ${lng}.</p>`);

    fromEvent(marker, 'click').pipe(
    ).subscribe(e => {
      // console.log(id);
      this.store.select(getLocationEntitiesState)
        .pipe(
          take(1),
          map((entities) => entities[getPrefixID(id)])
        )
        .subscribe(data => {
          this.oldData = {...data};
          this.outputData.location = data.name;
          this.outputData.locationID = data.id;
          this.formLocation.patchValue({...data});
        });
    });
    if (marker) {
      // this.listMarker.push(marker);
      this.mapMarker.set(id, marker);
    }
  }

  // getMarkerInListMarkerByLatLng(lat: number, lng: number): any {
  getMarkerInListMarkerByID(id: number): any {
    // let marker = null;
    // console.log('getMarkerInListMarkerByLatLng');
    // if (this.listMarker) {
    //   this.listMarker.some(item => {
    //     const {lat: latTemp, lng: lngTemp} = item.getLatLng();
    //     // console.log('item.getLatLng()', item.getLatLng(), latTemp, lngTemp);
    //     if (lat === latTemp && lng === lngTemp) {
    //       // console.log('================================');
    //       marker = item;
    //       return true;
    //     }
    //   });
    // }
    const marker = this.mapMarker.get(id);
    return marker;
  }

  handlerSearch(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.params = {
      ...this.params,
      page: 1,
      ...this.formSearch.value
    };
    // console.log(this.params);
    this.store.dispatch(new LoadPageLocation(this.params));
    this.accordion.openAll();
  }

  handlerPage(event: PageEvent): void {
    this.params = {
      ...this.params,
      page: event.pageIndex + 1,
      size: event.pageSize
    };
    this.store.dispatch(new LoadPageLocation(this.params));
  }

  openDialogObjectType(): void {
    this.clearObjectType();
    this.store.dispatch(new LoadObjectType(null));
    this.dialog.open(this.dialogObjectType, {
      width: '50%',
      height: '60%'
    });
  }

  setFileImageControl(file: any): void {
    if (this.formData.has('file')) {
      this.formData.set('file', file);
    } else {
      this.formData.append('file', file);
    }
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
    this.linkImage$.complete();
  }

  save(type: string): void {
    switch (type) {
      case this.LOCATION: {
        if (this.formLocation.valid) {
          this.store.dispatch(new SaveLocation({...this.formLocation.value}));

          this.store.select(fromStore.getLocationResponseStatusState).pipe(
            skip(1),
            map(({status}) => status),
            filter(isNotNull => !!isNotNull),
            take(1)
          ).subscribe(status => {
            if (status === '200') {
              console.log(this.oldData);
              if (this.oldData) {
                const marker = this.getMarkerInListMarkerByID(this.oldData.id);
                marker?.remove();
                this.mapMarker.delete(this.oldData.id);
                this.oldData = null;
                this.formLocation.reset();
              }
              this.store.select(getArrayLocationState)
                .pipe(take(1))
                .subscribe(data => {
                  // this.listMarker.forEach(item=>{
                  //   item.remove();
                  // })
                  // this.listMarker=[]
                  console.log(data);
                  data?.forEach((item: any) => {
                    this.markerItem(item);
                  });
                });
            }
          });


        }
        break;
      }
      case this.OBJECT_TYPE: {
        if (this.formObjectType.valid) {
          if (this.formData.has('name')) {
            this.formData.set('name', this.formObjectType.value.name);
          } else {
            this.formData.append('name', this.formObjectType.value.name);
          }
          if (this.formData.has('id') && this.formObjectType.value.id) {
            this.formData.set('id', this.formObjectType.value.id);
          } else if (this.formObjectType.value.id) {
            this.formData.append('id', this.formObjectType.value.id);
          } else {
            this.formData.delete('id');
          }
          this.store.dispatch(new SaveObjectType(this.formData));
        }
        break;
      }
    }
  }

  delete(type: string): void {
    switch (type) {
      case this.LOCATION: {
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed().pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.store.dispatch(new RemoveLocation(this.formLocation.value.id));
              this.clearLocation();
            }
          });
        this.store.select(fromStore.getLocationResponseStatusState).pipe(
          skip(1),
          map(({status}) => status),
          filter(isNotNull => !!isNotNull),
          take(1)
        ).subscribe(status => {
          if (status === '200') {
            if (this.oldData) {
              const marker = this.getMarkerInListMarkerByID(this.oldData.id);
              marker?.remove();
              this.mapMarker.delete(this.oldData.id);
              this.oldData = null;
            }
          }
        });
        break;
      }
      case this.OBJECT_TYPE: {
        const dialogRef = this.dialog.open(this.dialogDelete, {
          width: '20%'
        });
        dialogRef.afterClosed().pipe(take(1))
          .subscribe(result => {
            if (result) {
              this.store.dispatch(new RemoveObjectType(this.formObjectType.value.id));
              this.clearObjectType();
            }
          });
        break;
      }
    }
  }

  selectionChange(event: MatSelectionListChange, type: string): void {
    switch (type) {
      case this.OBJECT_TYPE: {
        const id = event.options[0]?.value;
        if (id) {
          this.formData.delete('file');
          this.store.select(getObjectTypeEntitiesState)
            .pipe(
              take(1),
              map((entities) => entities[getPrefixID(id)])
            ).subscribe(data => {
            this.linkImage$.next({name: data?.image});
            this.formObjectType.patchValue({
              ...data
            });
          });
        }
        break;
      }
      case this.LOCATION: {
        const id = event.options[0]?.value;
        if (id) {
          this.store.select(getLocationSearchEntitiesState)
            .pipe(
              take(1),
              map((entities) => entities[getPrefixID(id)])
            ).subscribe(data => {
            const {latitude, longitude} = data;
            this.viewMap(id, latitude, longitude);
          });
        }
        break;
      }
    }
  }

  viewMap(id: number, latitude: number, longitude: number): void {
    // console.log('setview');
    this.map.setView([latitude, longitude], 13);
    // this.getMarkerInListMarkerByLatLng(latitude, longitude)?.openPopup();
    this.getMarkerInListMarkerByID(id)?.openPopup();
  }

  onNewObjectType(): void {
    this.clearObjectType();
  }

  onNewLocation(): void {
    this.clearLocation();
  }

  clearObjectType(): void {
    this.linkImage$.next({name: ''});
    this.matSelectionObjectType?.selectedOptions?.clear();
    this.formObjectType.reset();
  }

  clearLocation(): void {
    this.formLocation.reset();
  }
}


const IconExtend = L.Icon.extend({
  options: {
    // iconUrl: './marker-icon.png',
    // iconUrl: './4g.png',
    // iconUrl: 'assets/img/marker-icon.png',
    // iconUrl: 'assets/img/4g.png',
    // iconUrl: 'assets/img/symbols/shop/bag.svg',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
  }
});
const iconDefault = new IconExtend({iconUrl: 'assets/images/icon/marker-icon.png'});
L.Marker.prototype.options.icon = iconDefault;
