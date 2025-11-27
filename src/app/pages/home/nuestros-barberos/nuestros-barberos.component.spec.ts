import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrosBarberosComponent } from './nuestros-barberos.component';

describe('NuestrosBarberosComponent', () => {
  let component: NuestrosBarberosComponent;
  let fixture: ComponentFixture<NuestrosBarberosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrosBarberosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuestrosBarberosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
