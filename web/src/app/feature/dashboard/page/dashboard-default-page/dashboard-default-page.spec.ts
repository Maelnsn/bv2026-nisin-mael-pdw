import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardDefaultPage } from './dashboard-default-page';

describe('DashboardDefaultPage', () => {
  let component: DashboardDefaultPage;
  let fixture: ComponentFixture<DashboardDefaultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDefaultPage],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardDefaultPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
