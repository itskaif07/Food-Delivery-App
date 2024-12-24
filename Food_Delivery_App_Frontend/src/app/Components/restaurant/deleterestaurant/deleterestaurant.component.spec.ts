import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleterestaurantComponent } from './deleterestaurant.component';

describe('DeleterestaurantComponent', () => {
  let component: DeleterestaurantComponent;
  let fixture: ComponentFixture<DeleterestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleterestaurantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleterestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
