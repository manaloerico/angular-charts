/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThemingService } from './theming.service';

describe('Service: Theming', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemingService]
    });
  });

  it('should ...', inject([ThemingService], (service: ThemingService) => {
    expect(service).toBeTruthy();
  }));
});
