import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBarberoComponent } from './new-barbero.component';

describe('NewBarberoComponent', () => {
  let component: NewBarberoComponent;
  let fixture: ComponentFixture<NewBarberoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBarberoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewBarberoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
