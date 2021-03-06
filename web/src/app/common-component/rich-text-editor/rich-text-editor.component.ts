import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {QuillConfiguration} from './quill-configuration';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RichTextEditorComponent implements  OnInit{
  quillConfiguration = QuillConfiguration;
  @Input() description!: FormControl;
  @Input() label!: string;

  constructor() {
  }

  ngOnInit(): void {
  }
}
