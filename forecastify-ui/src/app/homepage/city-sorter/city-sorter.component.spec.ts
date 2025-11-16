import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySorterComponent } from './city-sorter.component';

describe('CitySorterComponent', () => {
  let component: CitySorterComponent;
  let fixture: ComponentFixture<CitySorterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySorterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitySorterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
