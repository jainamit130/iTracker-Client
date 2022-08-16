import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GraphstatService } from './graphstat.service';

describe('GraphstatService', () => {
  let service: GraphstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule 
      ],
    });
    service = TestBed.inject(GraphstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
