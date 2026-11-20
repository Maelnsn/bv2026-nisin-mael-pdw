import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthRouter } from './auth-router';

describe('AuthRouter', () => {
  let component: AuthRouter;
  let fixture: ComponentFixture<AuthRouter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRouter],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthRouter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
