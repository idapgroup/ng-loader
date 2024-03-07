import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultGlobalLoaderComponent } from './default-global-loader.component';

describe('DefaultGlobalLoaderComponent', () => {
  let component: DefaultGlobalLoaderComponent;
  let fixture: ComponentFixture<DefaultGlobalLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultGlobalLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultGlobalLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
