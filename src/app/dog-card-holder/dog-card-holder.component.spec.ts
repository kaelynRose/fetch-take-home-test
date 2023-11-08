import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DogCardHolderComponent } from './dog-card-holder.component';

describe('DogCardHolderComponent', () => {
  let component: DogCardHolderComponent;
  let fixture: ComponentFixture<DogCardHolderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DogCardHolderComponent]
    });
    fixture = TestBed.createComponent(DogCardHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
