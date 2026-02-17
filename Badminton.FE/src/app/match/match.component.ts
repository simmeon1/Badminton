import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {Matchup} from '../matchup-builder.service';

@Component({
  selector: 'match',
  imports: [],
  templateUrl: './match.component.html',
  styleUrl: './match.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Match {
    public readonly selectedPlayer = input<string>();
    public readonly matchup = input.required<Matchup>();
}
