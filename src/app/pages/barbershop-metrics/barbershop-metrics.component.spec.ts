import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarbershopMetricsComponent } from './barbershop-metrics.component';

describe('BarbershopMetricsComponent', () => {
  let component: BarbershopMetricsComponent;
  let fixture: ComponentFixture<BarbershopMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarbershopMetricsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarbershopMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
