import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCortesComponent } from './all-cortes.component';

describe('AllCortesComponent', () => {
  let component: AllCortesComponent;
  let fixture: ComponentFixture<AllCortesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCortesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCortesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
