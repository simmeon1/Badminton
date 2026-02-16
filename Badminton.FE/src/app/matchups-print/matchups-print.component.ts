import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {MatCheckbox} from '@angular/material/checkbox';
import {
    MatAccordion,
    MatExpansionPanel, MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Matchup, MatchupCollection, Pairing} from '../matchup-builder.service';
import {JsonPipe, KeyValuePipe} from '@angular/common';

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
        JsonPipe
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
}
