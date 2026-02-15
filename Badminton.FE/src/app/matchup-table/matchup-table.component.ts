import {ChangeDetectionStrategy, Component, computed, Input, input, signal} from '@angular/core';
import {FormParams, Matchup, Pairing, Response} from "../app.component";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {HttpParams, httpResource} from "@angular/common/http";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatCheckbox} from "@angular/material/checkbox";
import {environment} from '../../environments/environment';

@Component({
  selector: 'matchup-table',
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
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatCheckbox
  ],
  templateUrl: './matchup-table.component.html',
  styleUrl: './matchup-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MatchupTable {
  public readonly inputResponse = input.required<Response>();
  public readonly formParams = input.required<FormParams>();

  public readonly selectedIndex = signal<number | undefined>(undefined);
  private readonly selectedRow = computed(() => {
    const selectedIndex = this.selectedIndex();
    return selectedIndex === undefined ? undefined : this.playerRowsDatasource()[selectedIndex];
  });

  public readonly displayedColumns: string[] = [
    'position',
    'courtIndex',
    'playerIndex',
    'name',
    'matchups',
  ];

  private readonly updatedDatasource = signal<PlayerRow[] | undefined>(undefined);

  public readonly latestResponse = computed(() => {
    if (!this.updatedDatasource()) {
      return this.inputResponse();
    }
    return this.httpResourceRef.value();
  });

  public readonly httpResourceRef = httpResource<Response>(() => {
    const updatedDatasource = this.updatedDatasource();
    if (!updatedDatasource) {
      return undefined;
    }
    const params = new HttpParams({
      fromObject: {
        names: updatedDatasource.map(r => r.name),
        minGames: this.formParams().minGames,
        courtCount: this.formParams().courtCount
      }
    });
    return `${environment.API_URL}/api/matchups?${params.toString()}`;
  });

  public readonly playerRowsDatasource = computed((): PlayerRow[] => {
    const updatedDatasource = this.updatedDatasource();
    if (!updatedDatasource) {
      return this.mapResponse(this.inputResponse());
    }
    const latestResponse = this.latestResponse();
    return latestResponse ? this.mapResponse(latestResponse) : updatedDatasource;
  });

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

  private mapResponse(r: Response): PlayerRow[] {
    const rows: PlayerRow[] = [];
    for (const [courtIndex, matchupCollection] of Object.entries(r)) {
      for (const [index, name] of Object.entries(matchupCollection.players)) {
        const playerMatchups = matchupCollection.matchups.filter(m =>
          [m.pairing1.player1, m.pairing1.player2, m.pairing2.player1, m.pairing2.player2].includes(name)
        );
        const pairIncludesPlayer = (p: Pairing) => [p.player1, p.player2].includes(name) ? 1 : 0
        const getMatchupsTexts = (matchups: Matchup[]) => {
          const result: string[] = [];
          for (const m of matchups) {
            const pairs = [m.pairing1, m.pairing2].sort((p1, p2) => {
              return pairIncludesPlayer(p2) - pairIncludesPlayer(p1);
            })
            const getPairingText = (p: Pairing, includeFirst: boolean) => {
              const players = [p.player1, p.player2].sort((p1, p2) => {
                const isPlayer = (p: string) => p === name ? 1 : 0
                return isPlayer(p2) - isPlayer(p1);
              })
              return includeFirst ? `${players[0]}-${players[1]}` : players[1];
            }
            result.push(`${getPairingText(pairs[0], false)} v. ${getPairingText(pairs[1], true)}`)
          }
          return result.join('\n');
        }

        rows.push({
          courtIndex,
          playerIndex: (parseInt(index) + 1).toString(),
          name,
          partners: playerMatchups
            .flatMap(m => [m.pairing1, m.pairing2])
            .filter(p => pairIncludesPlayer(p))
            .flatMap(p => [p.player1, p.player2])
            .filter(p => p !== name),
          matchups: getMatchupsTexts(playerMatchups)
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
    if (this.selectedIndex() === previousIndex) {
      this.selectedIndex.set(currentIndex);
    }
    this.updatedDatasource.set(dataSource);
  }

  public trackByName(index: number, item: PlayerRow): string {
    return item.name;
  }

  public selectIndex(index: number) {
    this.selectedIndex.update((i) => i !== index ? index : undefined);
  }

  public isPartnerOfSelected(name: string) {
    return this.selectedRow()?.partners.includes(name);
  }
}

interface PlayerRow {
  courtIndex: string
  playerIndex: string
  name: string
  partners: string[]
  matchups: string
}

interface MatchupText {
  courtIndex: string
  matchups: string[]
}
