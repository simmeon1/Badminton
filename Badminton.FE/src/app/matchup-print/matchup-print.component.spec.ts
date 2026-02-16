import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupPrint } from './matchup-print.component';

describe('MatchupPrint', () => {
  let component: MatchupPrint;
  let fixture: ComponentFixture<MatchupPrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchupPrint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchupPrint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
