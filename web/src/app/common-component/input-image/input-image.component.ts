import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
})
export class InputImageComponent implements OnInit {
  @Input() imagePath!: string;

  @Output() changeFileImage: EventEmitter<any>;

  constructor() {
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
