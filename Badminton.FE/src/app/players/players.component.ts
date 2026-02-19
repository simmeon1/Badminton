import {ChangeDetectionStrategy, Component, computed, inject, input, output, signal} from '@angular/core';
import {MatchupCollection, Pairing} from "../matchup-builder.service";
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
} from "@angular/material/table";
import {CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from '@angular/material/expansion';
import {SelectedIndexAndRow} from './selected-index-and-row';
import {MatButton} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'players',
    imports: [
        MatTable,
        CdkDropList,
        MatHeaderCell,
        MatCell,
        MatIcon,
        MatHeaderRow,
        MatRow,
        CdkDrag,
        MatColumnDef,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        CdkDragHandle,
        MatNoDataRow,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle,
        MatButton
    ],
    templateUrl: './players.component.html',
    styleUrl: './players.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Players {
    public readonly displayedColumns: string[] = [
        'position',
        'courtIndex',
        'playerIndex',
        'name'
    ];
    public readonly latestResponse = input<Record<number, MatchupCollection>>();
    public readonly isLoading = input.required<boolean>();
    public readonly datasourceChanged = output<string[]>();
    public readonly playersReordered = output<string[]>();
    public readonly selectedPlayerChanged = output<string | undefined>();
    public readonly selectedPlayer = input<string>();
    private readonly localDatasource = signal<PlayerRow[]>([]);
    public readonly dataSource = computed((): PlayerRow[] => {
        const latestResponse = this.latestResponse();
        return latestResponse ? this.mapResponse(latestResponse) : this.localDatasource();
    });
    public readonly selectedRow = computed(() => {
        const selectedPlayer = this.selectedPlayer();
        if (selectedPlayer === undefined) {
            return undefined;
        }
        for (let i = 0; i < this.dataSource().length; i++){
            const row = this.dataSource()[i];
            if (row.name === selectedPlayer) {
                const result: SelectedIndexAndRow<PlayerRow> = {index: i, row}
                return result;
            }
        }
        return undefined;
    });
    private readonly snackBar = inject(MatSnackBar);

    private mapResponse(r: Record<number, MatchupCollection>): PlayerRow[] {
        const rows: PlayerRow[] = [];
        for (const [courtIndex, matchupCollection] of Object.entries(r)) {
            for (const [index, name] of Object.entries(matchupCollection.players)) {
                const playerMatchups = matchupCollection.matchups.filter(m =>
                    [m.pairing1.player1, m.pairing1.player2, m.pairing2.player1, m.pairing2.player2].includes(name)
                );
                const pairIncludesPlayer = (p: Pairing) => [p.player1, p.player2].includes(name) ? 1 : 0
                rows.push({
                    courtIndex,
                    playerIndex: (parseInt(index) + 1).toString(),
                    name,
                    partners: playerMatchups
                        .flatMap(m => [m.pairing1, m.pairing2])
                        .filter(p => pairIncludesPlayer(p))
                        .flatMap(p => [p.player1, p.player2])
                        .filter(p => p !== name),
                })
            }
        }
        return rows;
    }

    public drop(table: MatTable<PlayerRow>, movedName: string, currentIndex: number) {
        const dataSource = [...(table.dataSource as PlayerRow[])];
        const names = dataSource.map(r => r.name);
        const previousIndex = names.findIndex(n => n === movedName);
        if (previousIndex === currentIndex) {
            return;
        }
        moveItemInArray(dataSource, previousIndex, currentIndex);
        if (this.selectedRow()?.index === previousIndex) {
            this.selectedPlayerChanged.emit(movedName)
        }
        this.localDatasource.set(dataSource);
        this.datasourceChanged.emit(dataSource.map(r => r.name))
    }

    public trackByName(index: number, item: PlayerRow): string {
        return item.name;
    }

    public selectIndex(name: string) {
        this.selectedPlayerChanged.emit(this.selectedPlayer() === name ? undefined : name);
    }

    public syncToForm() {
        const names = this.dataSource().map(row => row.name);
        this.playersReordered.emit(names);
        this.snackBar.open('Synced to Form', undefined, {duration: 500});
    }

    public isPartnerOfSelected(name: string) {
        return this.selectedRow()?.row.partners.includes(name);
    }
}

interface PlayerRow {
    courtIndex: string
    playerIndex: string
    name: string
    partners: string[]
}

