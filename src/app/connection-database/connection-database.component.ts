import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connection-database',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './connection-database.component.html',
  styleUrls: ['./connection-database.component.css']
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

  databaseTypes = ['MySQL', 'PostgreSQL', 'MongoDB'];
  tables: string[] = [];  // لحفظ أسماء الجداول
  selectedTables: string[] = [];  // الجداول التي يتم اختيارها لترحيلها

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:3333/api/connect', { connections: [this.connectionData] })
      .subscribe(
        response => {
          console.log('Data sent successfully:', response);

          const connectionResponse = response as any;
          if (connectionResponse && connectionResponse.connections && connectionResponse.connections.length > 0) {
            if (Array.isArray(connectionResponse.connections[0].tables)) {
              this.tables = connectionResponse.connections[0].tables;  // حفظ أسماء الجداول في المتغير
              console.log("Tables:", this.tables);
              alert('Successfully connected!');
            } else {
              alert('No tables found.');
            }
          } else {
            alert('No connections found or invalid response format.');
          }
        },
        error => {
          console.error('Error occurred while sending:', error);
          alert('An error occurred while connecting. Please try again.');
        }
      );
  }

  // تحديث مصفوفة selectedTables عند تغيير حالة الشيكبوكس
  onTableSelectionChange(table: string, event: any) {
    const checked = event.target.checked;

    if (checked) {
      // إضافة الجدول إلى المصفوفة إذا تم تحديده
      this.selectedTables.push(table);
    } else {
      // إزالة الجدول من المصفوفة إذا تم إلغاء تحديده
      const index = this.selectedTables.indexOf(table);
      if (index > -1) {
        this.selectedTables.splice(index, 1);
      }
    }

    console.log("Selected Tables:", this.selectedTables);
  }

  // دالة للتحقق من إذا كان الجدول مختاراً
  isSelected(table: string): boolean {
    return this.selectedTables.includes(table);
  }

  onMigrate() {
    // تأكد من أن الجداول المختارة هي مصفوفة تحتوي على عناصر
    if (this.selectedTables.length === 0) {
      alert('Please select at least one table to migrate.');
      return;
    }

    // تحقق من أن selectedTables هي مصفوفة من السلاسل النصية
    if (!Array.isArray(this.selectedTables)) {
      console.error('Error: selectedTables is not an array');
      alert('Error: Please select valid tables.');
      return;
    }

    // إرسال الجداول المختارة إلى الخادم لترحيلها
    this.http.post('http://localhost:3333/api/migrate', {
      sourceDB: `${this.connectionData.serverType}-${this.connectionData.host}-${this.connectionData.database}`,
      tables: this.selectedTables
    })
      .subscribe(
        response => {
          console.log('Migration successful:', response);
          alert('Data migration successful!');
          this.router.navigate(['/chat']);
        },
        error => {
          console.error('Migration failed:', error);
          alert('Migration failed. Please try again.');
        }
      );
  }
}
