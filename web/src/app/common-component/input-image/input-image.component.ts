import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
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
    this.formImage.reset();
  }

  @Output() changeFileImage: EventEmitter<any>;
  formImage: FormGroup;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private fb: FormBuilder) {
    this.changeFileImage = new EventEmitter<any>();
    this.formImage = this.fb.group({
      image: [null]
    });
  }

  ngOnInit(): void {
  }

  changeFileInput(event: any): void {
    event?.preventDefault();
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
    this.formImage.reset();
    this.changeFileImage.emit(null);
  }
}
