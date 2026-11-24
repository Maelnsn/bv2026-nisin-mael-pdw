import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FallbackPage } from './fallback-page';

describe('FallbackPage', () => {
  let component: FallbackPage;
  let fixture: ComponentFixture<FallbackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FallbackPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FallbackPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
