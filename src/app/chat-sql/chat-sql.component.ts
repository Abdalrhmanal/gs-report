"use client";
import { Component, AfterViewInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { ObjectValuesPipe } from '../object-values.pipe';

@Component({
  selector: 'app-chat-sql',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, ObjectValuesPipe],
  templateUrl: './chat-sql.component.html',
  styleUrls: ['./chat-sql.component.css']
})
export class ChatSqlComponent implements AfterViewInit {
  sqlQuery = '';  
  messages: { content: string, type: string, result?: Record<string, unknown>[], isChartView?: boolean }[] = [];
  isLoading = false;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    console.log();
    
  }

  // إرسال الاستعلام إلى الخادم
  sendQuery() {
    if (this.sqlQuery.trim()) {
      this.addMessage(this.sqlQuery, 'user');
      this.isLoading = true;

      this.executeSQLQuery(this.sqlQuery).subscribe(
        (response) => {
          this.isLoading = false;
          if (response.result && Array.isArray(response.result) && response.result.length > 0) {
            this.addMessage('Query executed successfully, displaying results:', 'server', response.result, false);
          } else {
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

  addMessage(content: string, type: string, result?: Record<string, unknown>[], isChartView = false) {
    this.messages.push({ content, type, result, isChartView });
  }

  executeSQLQuery(query: string): Observable<{ result: Record<string, unknown>[] }> {
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
    return this.http.post<{ result: Record<string, unknown>[] }>('http://localhost:3333/api/queryMongo', requestData);
  }

  // الحصول على أسماء الأعمدة
  getColumns(row: Record<string, unknown>): string[] {
    return Object.keys(row);
  }

  // تبديل وضع العرض لرسالة معينة
  toggleViewMode(messageIndex: number) {
    this.messages[messageIndex].isChartView = !this.messages[messageIndex].isChartView;
    if (this.messages[messageIndex].isChartView) {
      setTimeout(() => this.createChart(this.messages[messageIndex].result || [], messageIndex), 100);
    }
  }

  // إنشاء رسم بياني باستخدام D3.js
  createChart(data: Record<string, unknown>[], messageIndex: number) {
    if (!data || data.length === 0) return;

    const columns = Object.keys(data[0]);
    const numericColumns = columns.filter((col) => typeof data[0][col] === 'number');
    if (numericColumns.length === 0) return;

    const xColumn = columns[0];
    const yColumn = numericColumns[0];

    d3.select(`#chart-${messageIndex}`).selectAll("*").remove();

    const svg = d3.select(`#chart-${messageIndex}`),
      margin = { top: 20, right: 30, bottom: 40, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(data.map(d => d[xColumn] as string))
      .range([0, width])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yColumn] as number) || 0])
      .nice()
      .range([height, 0]);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append("g")
      .call(d3.axisLeft(y));

      g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[xColumn] as string) || 0)
      .attr("y", d => y(d[yColumn] as number) || 0)
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d[yColumn] as number))
      .attr("fill", "#4caf50"); 
  }
}
