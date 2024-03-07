import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBlockLoaderComponent } from './default-block-loader.component';

describe('DefaultBlockLoaderComponent', () => {
  let component: DefaultBlockLoaderComponent;
  let fixture: ComponentFixture<DefaultBlockLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultBlockLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultBlockLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
