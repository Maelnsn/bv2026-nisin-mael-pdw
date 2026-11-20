import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingInPage } from './sing-in-page';

describe('SingInPage', () => {
  let component: SingInPage;
  let fixture: ComponentFixture<SingInPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingInPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SingInPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
