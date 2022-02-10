import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DOMAIN_SERVER} from '../../constans/url-api.const';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputImageComponent implements OnInit {
  imagePath: { name: string } = {name: ''};
  @Input() set dataNameImage(data: { name: string }) {
    if (data?.name) {
      this.imagePath = {name: `${DOMAIN_SERVER}/${data?.name}`};
    }else{
      this.imagePath = {name: ''};
    }
  }

  @Output() changeFileImage: EventEmitter<any>;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.changeFileImage = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  changeFileInput(event: any): void {
    event.preventDefault();
    const file = event?.target?.files[0];
    if (file) {
      this.changeFileImage.emit(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = {name: reader.result as string};
        this.changeDetectorRef.detectChanges();
      };
      reader.readAsDataURL(file);
    } else {
      this.changeFileImage.emit(null);
    }
  }

  removeImage(): void {
    this.imagePath = {name: ''};
    this.changeFileImage.emit(null);
  }
}
