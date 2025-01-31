import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatSqlComponent } from './chat-sql.component';

describe('ChatSqlComponent', () => {
  let component: ChatSqlComponent;
  let fixture: ComponentFixture<ChatSqlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatSqlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatSqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
