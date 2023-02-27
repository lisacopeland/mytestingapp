import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DogResponse, DogsService, baseUrl } from './dogs.service';

describe('DogsService', () => {
  let httpMock: HttpTestingController;
  let service: DogsService;
  const mockedResponse: DogResponse = {
    message: '1234',
    status: 'success'
  }
  let dogUrl = baseUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DogsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get should return a value when called', () => {
    service.get().subscribe((res) => {
      expect(res).toEqual(mockedResponse);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: dogUrl
    })
    req.flush(mockedResponse);
  })
});
