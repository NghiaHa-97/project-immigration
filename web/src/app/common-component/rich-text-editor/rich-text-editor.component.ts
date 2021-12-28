import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {QuillConfiguration} from "./quill-configuration";

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements  OnInit{
  quillConfiguration = QuillConfiguration;
  @Input() richTextForm!: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }
}
