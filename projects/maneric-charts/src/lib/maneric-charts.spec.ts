import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManericCharts } from './maneric-charts';

describe('ManericCharts', () => {
  let component: ManericCharts;
  let fixture: ComponentFixture<ManericCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManericCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManericCharts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
