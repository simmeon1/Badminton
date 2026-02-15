import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchupsPrint } from './matchups-print.component';

describe('MatchupsPrint', () => {
  let component: MatchupsPrint;
  let fixture: ComponentFixture<MatchupsPrint>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchupsPrint]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchupsPrint);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
