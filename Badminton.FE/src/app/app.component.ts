import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Players} from "./players/players.component";
import {Matches} from './matches/matches.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {MatchupBuilder, MatchupCollection} from './matchup-builder.service';
import {GameForm} from './game-form/game-form.component';
import {FieldTree, form, min, required} from '@angular/forms/signals';

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
    public readonly form: FieldTree<Form>;

    public constructor() {
        const nameCheckboxes = [
            'Alfa',
            'Bravo',
            'Charlie',
            'Delta',
            'Echo',
            'Foxtrot',
            'Golf',
            'Hotel',
            'India',
            'Juliett',
            'Kilo',
            'Lima',
            'Mike',
        ].map(n => ({ name: n, checked: true } as NameCheckbox));
        this.form = form(signal<Form>({
                names: nameCheckboxes,
                minGames: 4,
                courtCount: 2,
            }), (schemaPath) => {
                required(schemaPath.minGames);
                min(schemaPath.minGames, 1);
                required(schemaPath.courtCount);
                min(schemaPath.courtCount, 1);
            }
        )
    }

    public datasourceChanged(names: string[]) {
        const q = this.query();
        if (q) {
            this.query.set({
                names,
                minGames: q.minGames,
                courtCount: q.courtCount
            });
        }
    }

    public selectedPlayerChanged(name: string | undefined) {
        this.selectedPlayer.set(name);
    }

    public playersReordered(orderedNames: string[]) {
        this.selectedTab.set(0);
        const reorderedCheckboxes: NameCheckbox[] = [...new Set<string>(orderedNames.concat(this.form.names().value().map(n => n.name)))]
            .map(n => {
                const curr = this.form.names().value().find(nn => nn.name === n);
                return {
                    name: n,
                    checked: curr ? curr.checked : false
                }
            });
        this.form.names().value.set(reorderedCheckboxes);
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

export interface NameCheckbox {
    name: string
    checked: boolean
}

export interface Form {
    names: NameCheckbox[];
    minGames: number;
    courtCount: number;
}
