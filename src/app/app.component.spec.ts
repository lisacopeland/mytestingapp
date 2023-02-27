import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DogResponse, DogsService } from './dogs.service';

describe('AppComponent', () => {
  const mockDogResponse: DogResponse = {
    message: 'test',
    status: 'success'
  }
  let mockDogService: jasmine.SpyObj<DogsService>;
  mockDogService = jasmine.createSpyObj('DogService', ['get']);      
  mockDogService.get.and.returnValue(of(mockDogResponse));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: DogsService, useValue: mockDogService }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mytestingapp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mytestingapp');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain('Dog Picture');
  });
  it('should get a dog object', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    component.getDogImage();
    expect(component.dogImageUrl).toBe('test');
  });

  it('Clicking the button should call getDogImage', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const dogbutton = fixture.debugElement.nativeElement.querySelector('#submitdog');
    dogbutton.click();
    const component = fixture.componentInstance;
    expect(component.dogImageUrl).toBe('test');

  
  });
});
