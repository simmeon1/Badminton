import {ChangeDetectionStrategy, Component, computed, input, linkedSignal, signal} from '@angular/core';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Matchup, MatchupCollection} from '../matchup-builder.service';
import {Match} from '../match/match.component';
import {CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatNoDataRow,
    MatRow,
    MatRowDef,
    MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatIconButton} from '@angular/material/button';

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
        MatHeaderCellDef,
        MatCheckbox,
        MatIconButton
    ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Matches {
    public readonly latestResponse = input.required<Record<number, MatchupCollection> | undefined>();
    public readonly isLoading = input.required<boolean>();
    public readonly selectedPlayer = input<string>();
    public readonly dataSource = linkedSignal((): MatchupRow[] => {
        const latestResponse = this.latestResponse();
        if (!latestResponse) {
            return [];
        }
        return this.mapResponse(latestResponse);
    });
    public readonly showIndexesCheckbox = signal(false);
    public readonly displayedColumns = computed(() =>
        ['position', 'courtIndex', 'rowIndex', 'matchupIndex']
            .concat(this.showIndexesCheckbox() ? ['id'] : [])
            .concat(['matchup']));
    public readonly selectedIndexes = computed(() => {
        const result: number[] = [];
        const selectedPlayer = this.selectedPlayer();
        if (selectedPlayer === undefined) {
            return result;
        }
        for (let i = 0; i < this.dataSource().length; i++){
            const row = this.dataSource()[i];
            const m = row.matchup;
            if ([m.pairing1.player1, m.pairing1.player2, m.pairing2.player1, m.pairing2.player2].includes(selectedPlayer)) {
                result.push(i);
            }
        }
        return result;
    });

    public drop(table: MatTable<MatchupRow>, movedMatchupText: string, currentIndex: number) {
        const dataSource = [...(table.dataSource as MatchupRow[])];
        const matchupTexts = dataSource.map(r => r.matchupText);
        const previousIndex = matchupTexts.findIndex(n => n === movedMatchupText);
        if (previousIndex === currentIndex) {
            return;
        }
        moveItemInArray(dataSource, previousIndex, currentIndex);
        this.dataSource.set(dataSource);
    }

    private mapResponse(r: Record<number, MatchupCollection>): MatchupRow[] {
        const rows: MatchupRow[] = [];
        for (const [courtIndex, matchupCollection] of Object.entries(r)) {
            const players = matchupCollection.players;
            const getPlayerIndex = (n: string) => {
                const index = Object.entries(players).find(([index, name]) => name === n)![0];
                return (parseInt(index) + 1).toString();
            }
            const getString = (p1: string, p2: string, p3: string, p4: string) =>
                `${p1}-${p2} v. ${p3}-${p4}`

            for (let i = 0; i < matchupCollection.matchups.length; i++){
                const m = matchupCollection.matchups[i];
                rows.push({
                    courtIndex: parseInt(courtIndex),
                    matchupIndex: i + 1,
                    matchup: m,
                    matchupShort: {
                        pairing1: {player1: getPlayerIndex(m.pairing1.player1), player2: getPlayerIndex(m.pairing1.player2)},
                        pairing2: {player1: getPlayerIndex(m.pairing2.player1), player2: getPlayerIndex(m.pairing2.player2)}
                    },
                    matchupText: getString(m.pairing1.player1, m.pairing1.player2, m.pairing2.player1,m.pairing2.player2),
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
    matchupShort: Matchup
    matchupText: string
}
