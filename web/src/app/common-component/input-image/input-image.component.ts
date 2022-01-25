import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DOMAIN_SERVER} from '../../constans/url-api.const';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputImageComponent implements OnInit {
  @Input() imagePath!: string;

  @Output() changeFileImage: EventEmitter<any>;

  constructor() {
    this.changeFileImage = new EventEmitter<any>();
  }

  ngOnInit(): void {
    if (this.imagePath){
      this.imagePath = `${DOMAIN_SERVER}/${this.imagePath}`;
    }
  }

  changeFileInput(event: any): void {
    event.preventDefault();
    const file = event?.target?.files[0];
    if (file) {
      this.changeFileImage.emit(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePath = reader.result as string;
      };
      reader.readAsDataURL(file);
    }else{
      this.changeFileImage.emit(null);
    }
  }

  removeImage(): void {
    this.imagePath = '';
    this.changeFileImage.emit(null);
  }
}
