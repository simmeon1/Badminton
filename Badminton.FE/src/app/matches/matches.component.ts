import {ChangeDetectionStrategy, Component, computed, input, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel, MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Matchup, MatchupCollection, Pairing} from '../matchup-builder.service';
import {Match} from '../match/match.component';
import {CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatNoDataRow,
    MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {SelectedIndexAndRow} from '../players/selected-index-and-row';

@Component({
  selector: 'matches',
    imports: [
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatExpansionPanelDescription,
        Match,
        CdkDrag,
        CdkDragHandle,
        CdkDropList,
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatRow,
        MatRowDef,
        MatTable,
        MatNoDataRow,
        MatHeaderCellDef
    ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Matches {
    public readonly displayedColumns: string[] = [
        'position',
        'courtIndex',
        'matchupIndex',
        'matchup'
    ];

    public readonly latestResponse = input.required<Record<number, MatchupCollection> | undefined>();
    public readonly isLoading = input.required<boolean>();
    public readonly selectedPlayer = input<string>();
    public readonly dataSource = computed((): MatchupRow[] => {
        const latestResponse = this.latestResponse();
        if (!latestResponse) {
            return [];
        }
        return this.mapResponse(latestResponse);
    });
    public readonly showIndexesCheckbox = signal(false);
    public readonly selectedRow = computed(() => {
        const selectedPlayer = this.selectedPlayer();
        if (selectedPlayer === undefined) {
            return undefined;
        }
        for (let i = 0; i < this.dataSource().length; i++){
            const row = this.dataSource()[i];
            const m = row.matchup;
            if ([m.pairing1.player1, m.pairing1.player2, m.pairing2.player1, m.pairing2.player2].includes(selectedPlayer)) {
                const result: SelectedIndexAndRow<MatchupRow> = {index: i, row}
                return result;
            }
        }
        return undefined;
    });


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

    public drop(table: MatTable<MatchupRow>, movedMatchupText: string, currentIndex: number) {
        const dataSource = table.dataSource as MatchupRow[];
        const matchupTexts = dataSource.map(r => r.matchupText);
        const previousIndex = matchupTexts.findIndex(n => n === movedMatchupText);
        if (previousIndex === currentIndex) {
            return;
        }
        moveItemInArray(dataSource, previousIndex, currentIndex);
        table.renderRows();
    }

    private mapResponse(r: Record<number, MatchupCollection>): MatchupRow[] {
        const rows: MatchupRow[] = [];
        for (const [courtIndex, matchupCollection] of Object.entries(r)) {
            for (let i = 0; i < matchupCollection.matchups.length; i++){
                const matchup = matchupCollection.matchups[i];
                rows.push({
                    courtIndex: parseInt(courtIndex),
                    matchupIndex: i + 1,
                    matchup,
                    matchupText: `${matchup.pairing1.player1}-${matchup.pairing1.player2} v. ${matchup.pairing2.player1}-${matchup.pairing2.player2}`
                })
            }
        }
        return rows;
    }

    public trackByText(index: number, item: MatchupRow): string {
        return item.matchupText;
    }
}

interface MatchupRow {
    courtIndex: number
    matchupIndex: number
    matchup: Matchup
    matchupText: string
}
