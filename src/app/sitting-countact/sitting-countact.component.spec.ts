import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SittingCountactComponent } from './sitting-countact.component';

describe('SittingCountactComponent', () => {
  let component: SittingCountactComponent;
  let fixture: ComponentFixture<SittingCountactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SittingCountactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SittingCountactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
