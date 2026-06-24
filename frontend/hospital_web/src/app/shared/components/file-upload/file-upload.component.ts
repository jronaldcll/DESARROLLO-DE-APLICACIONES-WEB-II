import { Component, ElementRef, HostListener, inject , ChangeDetectionStrategy} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
  styleUrls: ['./file-upload.component.scss'],
  imports: [MatButtonModule],
})
export class FileUploadComponent implements ControlValueAccessor {
  private host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  onChange!: (value: File | null) => void;
  public file: File | null = null;

  @HostListener('change', ['$event']) emitFiles(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target?.files;
    const file = files && files.item(0);
    this.onChange(file);
    this.file = file;
  }

  writeValue(_value: null) {
    // Using _value parameter to satisfy linting
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: (value: File | null) => void) {
    this.onChange = fn;
  }

  registerOnTouched(_fn: () => void) {
    // Using _fn parameter to satisfy linting
    // add code here
  }
}
