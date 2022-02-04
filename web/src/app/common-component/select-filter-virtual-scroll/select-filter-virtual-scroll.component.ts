import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocomplete} from '@angular/material/autocomplete';
import {debounceTime, map, startWith, tap} from 'rxjs/operators';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {element} from 'protractor';

@Component({
  selector: 'app-select-filter-virtual-scroll',
  templateUrl: './select-filter-virtual-scroll.component.html',
  styleUrls: ['./select-filter-virtual-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectFilterVirtualScrollComponent implements OnInit {
  // stateCtrl = new FormControl();
  // filteredStates: any[];
  // @ViewChild('statesAutocomplete') statesAutocompleteRef!: MatAutocomplete;
  // @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;
  //
  // states = [
  //   {
  //     name: 'Arkansas',
  //     population: '2.978M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
  //   },
  //   {
  //     name: 'California',
  //     population: '39.14M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
  //   },
  //   {
  //     name: 'Florida',
  //     population: '20.27M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
  //   },
  //   {
  //     name: 'Texas',
  //     population: '27.47M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
  //   },
  //   {
  //     name: 'Arkansas',
  //     population: '2.978M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
  //   },
  //   {
  //     name: 'California',
  //     population: '39.14M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
  //   },
  //   {
  //     name: 'Florida',
  //     population: '20.27M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
  //   },
  //   {
  //     name: 'Texas',
  //     population: '27.47M',
  //     // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
  //     flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
  //   }
  // ];
  //

  public data!: string[];

  @Input()
  public set dataSource(data: any[]) {
    // this.data = data;
    // this.filteredOptions = data;
    // this.setHeightAutoComplete(this.filteredOptions);
  }

  @Input() public control = new FormControl();
  @Input() public controlSelect = new FormControl('6');
  public filteredOptions!: any[];
  public height = '250px';
  @ViewChild('auto') statesAutocompleteRef!: MatAutocomplete;
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport!: CdkVirtualScrollViewport;

  // private onDestroy = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }


  ngOnInit(): void {
    this.data = this.data ?? [];
    // Seed data
    this.data = Array
      .from({length: 1000})
      .map((_, i) => Math.random().toString(36).substring(7)).sort();
    // this.setHeightAutoComplete(this.data);
    // Listen for changes to the input
    this.control.valueChanges
      .pipe(
        debounceTime(100),
        startWith(''),
        tap(value => console.log(value))
      )
      .subscribe(name => {
        // Filter the data
        // console.log(name);
        this.filteredOptions = [...this.data, '6'].filter(option => {
          if (name === '') {
            return true;
          }
          return option.toLowerCase().includes(name.toLowerCase());
        });
        console.log(this.filteredOptions);
        // console.log(this.filteredOptions);
        // Recompute how big the viewport should be.
        this.setHeightAutoComplete(this.filteredOptions);
        this.changeDetectorRef.detectChanges();
      });
  }

  setHeightAutoComplete(result: any[]): void {
    if (result.length < 4) {
      this.height = (result.length * 50) + 'px';
    } else {
      this.height = '200px';
    }
  }

  // openOptions
  openOptions(): void {
    setTimeout(() => {
      if (this.cdkVirtualScrollViewport) {
        // this.cdkVirtualScrollViewport.elementRef.nativeElement
        //   .getElementsByClassName('mat-active').item(0)?.classList.remove('mat-active');
        if (this.controlSelect.value) {
          const indexSelected = this.filteredOptions?.indexOf(this.controlSelect.value);
          if (indexSelected) {
            this.cdkVirtualScrollViewport
              .scrollToIndex(indexSelected - 1 >= 0 ? indexSelected - 1 : indexSelected);
          }
        } else {
          this.cdkVirtualScrollViewport.scrollToOffset(0);
        }
        this.cdkVirtualScrollViewport.checkViewportSize();
      }
    });
  }

  closeOptions(): void {
    const indexSelected = this.filteredOptions?.indexOf(this.controlSelect.value);
    if (indexSelected) {
      this.cdkVirtualScrollViewport
        .scrollToIndex(indexSelected - 1 >= 0 ? indexSelected - 1 : indexSelected);
    }
  }
}



