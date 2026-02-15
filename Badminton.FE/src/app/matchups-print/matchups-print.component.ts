import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {Pairing, Response} from '../app.component';

@Component({
  selector: 'matchups-print',
    imports: [
        MatCheckbox
    ],
  templateUrl: './matchups-print.component.html',
  styleUrl: './matchups-print.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MatchupsPrint {
    public readonly latestResponse = input.required<Response | undefined>();
    public readonly isLoading = input.required<boolean>();
    public readonly selectedPlayer = input<string>();
    public readonly matchups = computed((): MatchupText[] => {
        const result: MatchupText[] = [];
        const latestResponse = this.latestResponse();
        if (!latestResponse) {
            return [];
        }
        for (const [courtIndex, matchupCollection] of Object.entries(latestResponse)) {
            result.push({
                courtIndex,
                matchups: matchupCollection.matchups.map(m => {
                    const getPairingText = (p: Pairing) => `${p.player1}-${p.player2}`
                    return `${getPairingText(m.pairing1)} v. ${getPairingText(m.pairing2)}`
                })
            });
        }
        return result;
    });

    public isPlayerSelected(courtMatchup: string) {
        const player = this.selectedPlayer();
        return player ? courtMatchup.match(`\\b${player}\\b`) : false;
    }
}

interface MatchupText {
    courtIndex: string
    matchups: string[]
}
