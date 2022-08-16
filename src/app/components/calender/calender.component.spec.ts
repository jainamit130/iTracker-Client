import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CalenderComponent } from './calender.component';
import { HttpClient } from '@angular/common/http';

describe('CalenderComponent', () => {
  let component: CalenderComponent;
  let fixture: ComponentFixture<CalenderComponent>;
  let httpMock: HttpTestingController;
  let httpClient :HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderComponent ],
      imports: [
        HttpClientTestingModule 
      ],
    })
    .compileComponents();
    httpMock = TestBed.get(HttpTestingController);
    httpClient =  TestBed.inject(HttpClient);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
