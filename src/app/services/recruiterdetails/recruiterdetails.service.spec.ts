import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecruiterdetailsService } from './recruiterdetails.service';

describe('RecruiterdetailsService', () => {
  let service: RecruiterdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
    });
    service = TestBed.inject(RecruiterdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
