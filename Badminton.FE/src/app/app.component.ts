import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Players} from "./players/players.component";
import {Matches} from './matches/matches.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {MatchupBuilder, MatchupCollection} from './matchup-builder.service';
import {GameForm} from './game-form/game-form.component';

@Component({
    selector: 'app-root',
    imports: [
        Players,
        MatTabGroup,
        MatTab,
        Matches,
        GameForm
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class App {
    private readonly matchupBuilder = inject(MatchupBuilder);
    public readonly updatedNames = signal<string[]>([]);
    public readonly query = signal<QueryParams | undefined>(undefined);
    public readonly selectedTab = signal<number>(0);
    public readonly selectedPlayer = signal<string | undefined>(undefined);
    public readonly responseResource = rxResource<Record<number, MatchupCollection>, QueryParams | undefined>({
        params: () => this.query(),
        stream: (p) =>
            of(this.matchupBuilder.getMatchups(
                p.params.names,
                p.params.minGames,
                p.params.courtCount
            )),
    });

    public datasourceChanged(names: string[]) {
        this.query.set({
            names,
            minGames: this.query()!.minGames,
            courtCount: this.query()!.courtCount
        });
    }

    public selectedPlayerChanged(name: string | undefined) {
        this.selectedPlayer.set(name);
    }

    public copyNamesToForm(orderedNames: string[]) {
        this.selectedTab.set(0);
        this.updatedNames.set(orderedNames);
    }

    public formSubmitted(p: QueryParams) {
        this.query.set(p);
        this.selectedTab.set(1);
        this.selectedPlayer.set(undefined);
    }
}

export interface QueryParams {
    names: string[];
    minGames: number;
    courtCount: number;
}
