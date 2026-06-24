import { NgClass } from '@angular/common';
import { Component, input , ChangeDetectionStrategy} from '@angular/core';

interface Document {
  title: string;
  type: string;
  size: number;
  icon: string;
  iconClass: string;
  textClass: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-document-list',
    imports: [NgClass],
    templateUrl: './document-list.component.html',
    styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {
  readonly documents = input<Document[]>([]);

  onDelete(_document: Document) {
    // Handle document deletion
  }

  onDownload(_document: Document) {
    // Handle document download
  }
}
