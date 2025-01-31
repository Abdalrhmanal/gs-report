import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeysPipe } from '../keys.pipe';
import { ObjectValuesPipe } from '../object-values.pipe';

@Component({
  selector: 'app-chat-sql',
  imports: [CommonModule, FormsModule, HttpClientModule, KeysPipe, ObjectValuesPipe],
  templateUrl: './chat-sql.component.html',
  styleUrls: ['./chat-sql.component.css']
})
export class ChatSqlComponent {
  sqlQuery = '';  // save SQL
  messages: { content: string, type: string, result?: any[] }[] = [];  // save messages
  isLoading = false;  // loading status

  constructor(private http: HttpClient) {}

  // send query to server
  sendQuery() {
    if (this.sqlQuery.trim()) {
      // save the query in the messages array
      this.addMessage(this.sqlQuery, 'user');
      this.isLoading = true; 

      // send the query to the server
      this.executeSQLQuery(this.sqlQuery).subscribe(
        (response) => {
          this.isLoading = false;
          if (response.result && Array.isArray(response.result) && response.result.length > 0) {
            this.addMessage('Query executed successfully, displaying results:', 'server', response.result);
          } else {
            // return an error message if the result is not as expected
            this.addMessage('No results found or unexpected result format.', 'server');
          }
        },
        (error) => {
          this.isLoading = false;  
          this.addMessage(`Error: ${error.message}`, 'server');
        }
      );
      this.sqlQuery = '';  
    }
  }

  // add message to the messages array
  addMessage(content: string, type: string, result?: any[]) {
    this.messages.push({ content, type, result });
  }

  // send the query to the server
  executeSQLQuery(query: string): Observable<any> {
    const requestData = {
      query: query,
      serverType: 'MySQL',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'startaxi',
      useSSL: false
    };
    return this.http.post<any>('http://localhost:3333/api/query', requestData);
  }

  // get the columns of a row
  getColumns(row: any): string[] {
    return Object.keys(row);
  }
}
