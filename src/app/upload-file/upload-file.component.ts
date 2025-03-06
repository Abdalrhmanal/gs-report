
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-file',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent {
  fileToUpload: File | null = null;
  tableName = '';
  uploadStatus = '';

  constructor(private http: HttpClient) { }

  // Function to handle file selection
  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }

  // Function to handle file upload
  onUpload(): void {
    if (!this.fileToUpload) {
      this.uploadStatus = 'Please select a file first!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('tableName', this.tableName);

    this.uploadStatus = 'Uploading...';

    this.http.post('http://localhost:3333/api/upload', formData)
      .pipe(
        catchError(error => {
          this.uploadStatus = `Upload failed: ${error.message}`;
          return of(null);
        })
      )
      .subscribe(response => {
        if (response) {
          this.uploadStatus = 'File uploaded and data stored successfully!';
        }
      });
  }
}
