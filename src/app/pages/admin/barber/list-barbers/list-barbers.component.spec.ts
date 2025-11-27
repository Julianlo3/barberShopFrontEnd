import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBarbersComponent } from './list-barbers.component';

describe('ListBarbersComponent', () => {
  let component: ListBarbersComponent;
  let fixture: ComponentFixture<ListBarbersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBarbersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBarbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
