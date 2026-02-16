import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {
    MatAccordion,
    MatExpansionPanel, MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Matchup, MatchupCollection, Pairing} from '../matchup-builder.service';
import {JsonPipe, KeyValuePipe} from '@angular/common';
import {MatchupPrint} from '../matchup-print/matchup-print.component';

@Component({
  selector: 'matchups-print',
    imports: [
        MatCheckbox,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        KeyValuePipe,
        JsonPipe,
        MatchupPrint
    ],
  templateUrl: './matchups-print.component.html',
  styleUrl: './matchups-print.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MatchupsPrint {
    public readonly latestResponse = input.required<Record<number, MatchupCollection> | undefined>();
    public readonly isLoading = input.required<boolean>();
    public readonly selectedPlayer = input<string>();
    public readonly matchups = computed((): Record<string, MatchupCollection> => this.latestResponse() || {});
    public readonly showIndexesCheckbox = signal(false);

    public matchupContainsPlayer(matchup: Matchup) {
        const searchElement = this.selectedPlayer();
        if (!searchElement) {
            return false;
        }
        const pairIncludesPlayer = (p: Pairing) => [p.player1, p.player2].includes(searchElement) ? 1 : 0
        return pairIncludesPlayer(matchup.pairing1) || pairIncludesPlayer(matchup.pairing2);
    }

    public serializeMatchup(matchup: Matchup) {
        return JSON.stringify(matchup);
    }

    public getIndexedMatchup(matchup: Matchup, players: Record<number, string>): Matchup {
        const reverseMap: Record<string, string> = {};
        for (const [index, player] of Object.entries(players)) {
            reverseMap[player] = (parseInt(index) + 1).toString();
        }

        const p1 = reverseMap[matchup.pairing1.player1];
        const p2 = reverseMap[matchup.pairing1.player2];
        const p3 = reverseMap[matchup.pairing2.player1];
        const p4 = reverseMap[matchup.pairing2.player2];
        return {
            pairing1: {
                player1: p1,
                player2: p2,
            },
            pairing2: {
                player1: p3,
                player2: p4,
            }
        }
    }
}
