import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule here
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-connection-database',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './connection-database.component.html',
  styleUrl: './connection-database.component.css'
})
export class ConnectionDatabaseComponent {
  connectionData = {
    serverType: 'MySQL',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'startaxi',
    useSSL: false
  };

  constructor(private http: HttpClient,private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:3333/api/contactdb', this.connectionData)
      .subscribe(
        response => {
          console.log('Data sent successfully:', response);
          
          this.router.navigate(['/chat']);
          alert('Successfully connected!');
        },
        error => {
          console.error('Error occurred while sending:', error);
          alert('An error occurred while connecting. Please try again.');
        }
      );
  }
}
