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
                    const selectedPlayer = this.selectedPlayer() ?? '';
                    const pairIncludesPlayer = (p: Pairing) => [p.player1, p.player2].includes(selectedPlayer) ? 1 : 0
                    const pairs = [m.pairing1, m.pairing2].sort((p1, p2) => pairIncludesPlayer(p2) - pairIncludesPlayer(p1))

                    const getPairingText = (p: Pairing) => {
                        const players = [p.player1, p.player2].sort((p1, p2) => {
                            const isPlayer = (p: string) => p === selectedPlayer ? 1 : 0
                            return isPlayer(p2) - isPlayer(p1);
                        })
                        return `${players[0]}-${players[1]}`;
                    }
                    return `${getPairingText(pairs[0])} v. ${getPairingText(pairs[1])}`
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
