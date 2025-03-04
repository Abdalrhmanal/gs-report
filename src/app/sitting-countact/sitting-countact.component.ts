import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sitting-countact',
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './sitting-countact.component.html',
  styleUrl: './sitting-countact.component.css'
})
export class SittingCountactComponent implements OnInit {
  sourceDB = ''; // معرف قاعدة البيانات المتصل بها
  tables: string[] = []; // قائمة الجداول
  selectedTables: string[] = []; // الجداول المحددة

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    console.log('✅ SittingCountactComponent تم تحميله!');
    this.getTables();
  }

  // جلب أسماء الجداول من قاعدة البيانات
  getTables() {
    this.http.post<{ tables: string[] }>('http://localhost:3333/api/getTables', { sourceDB: this.sourceDB })
      .subscribe(
        response => this.tables = response.tables,
        error => console.error('❌ خطأ في جلب الجداول:', error)
      );
  }

  // تحديث القائمة عند تحديد أو إلغاء تحديد الجداول
  toggleTableSelection(table: string) {
    if (this.selectedTables.includes(table)) {
      this.selectedTables = this.selectedTables.filter(t => t !== table);
    } else {
      this.selectedTables.push(table);
    }
  }

  // إرسال الجداول المحددة لترحيلها إلى MongoDB
  migrateTables() {
    if (this.selectedTables.length === 0) {
      alert('⚠️ يرجى تحديد الجداول التي تريد ترحيلها.');
      return;
    }

    const requestData = { sourceDB: this.sourceDB, tables: this.selectedTables };

    this.http.post('http://localhost:3333/api/migrate', requestData)
      .subscribe(
        response => alert('✅ تم ترحيل الجداول بنجاح!'),
        error => console.error('❌ فشل الترحيل:', error)
      );
  }
}


