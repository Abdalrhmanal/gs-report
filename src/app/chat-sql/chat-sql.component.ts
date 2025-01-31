import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';


import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-chat-sql',
  imports: [ CommonModule,FormsModule ,HttpClientModule  ],
  templateUrl: './chat-sql.component.html',
  styleUrl: './chat-sql.component.css'
})

export class ChatSqlComponent {
  sqlQuery = '';  // متغير لتخزين استعلام SQL
  messages: { content: string, type: string }[] = [];  // مصفوفة لتخزين الرسائل

  constructor(private http: HttpClient) {}

  // دالة لإرسال الاستعلام إلى الخادم
  sendQuery() {
    if (this.sqlQuery.trim()) {
      this.addMessage(this.sqlQuery, 'user');  // إضافة الاستعلام للرسائل
      this.executeSQLQuery(this.sqlQuery).subscribe(
        (response) => {
          // إضافة رد الخادم إلى الرسائل
          this.addMessage(`Query Result: ${JSON.stringify(response.result)}`, 'server');
        },
        (error) => {
          this.addMessage(`Error: ${error.message}`, 'server');
        }
      );
      this.sqlQuery = '';  // مسح حقل الاستعلام بعد الإرسال
    }
  }

  // دالة لإضافة الرسائل إلى المصفوفة
  addMessage(content: string, type: string) {
    this.messages.push({ content, type });
  }

  // دالة لإرسال الاستعلام إلى الخادم
  executeSQLQuery(query: string): Observable<any> {
    const requestData = { query: query, serverType: 'MySQL', host: 'localhost', port: 3306, username: 'root', password: '', database: 'startaxi', useSSL: false };
    return this.http.post<any>('http://localhost:3333/api/query', requestData);
  }
}
