/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChartColorService } from './chart-color.service';

describe('Service: ChartColor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChartColorService]
    });
  });

  it('should ...', inject([ChartColorService], (service: ChartColorService) => {
    expect(service).toBeTruthy();
  }));
});
