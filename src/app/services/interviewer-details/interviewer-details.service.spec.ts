import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InterviewerDetailsService } from './interviewer-details.service';

describe('InterviewerDetailsService', () => {
  let service: InterviewerDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
    });
    service = TestBed.inject(InterviewerDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
