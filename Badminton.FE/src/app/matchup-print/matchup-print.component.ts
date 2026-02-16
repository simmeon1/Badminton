import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Matchup} from '../matchup-builder.service';

@Component({
  selector: 'matchup-print',
  imports: [],
  templateUrl: './matchup-print.component.html',
  styleUrl: './matchup-print.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchupPrint {
    public readonly selectedPlayer = input<string>();
    public readonly matchup = input.required<Matchup>();
}
