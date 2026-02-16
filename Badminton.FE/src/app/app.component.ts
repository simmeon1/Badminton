import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {form, FormField, max, min, required} from "@angular/forms/signals";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import shuffle from "knuth-shuffle-seeded";
import {MatchupTable} from "./matchup-table/matchup-table.component";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {MatchupsPrint} from './matchups-print/matchups-print.component';
import {rxResource} from '@angular/core/rxjs-interop';
import {Observable, of} from 'rxjs';
import {MatchupBuilder, MatchupCollection} from './matchup-builder.service';

@Component({
    selector: 'app-root',
    imports: [
        MatFormField,
        MatLabel,
        CdkTextareaAutosize,
        MatInput,
        MatCheckbox,
        MatButton,
        FormField,
        MatchupTable,
        MatTabGroup,
        MatTab,
        MatchupsPrint
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class App {
    public readonly form = form(signal<Form>({
            names: `Alfa
Bravo
Charlie
Delta
Echo
Foxtrot
Golf
Hotel
India
Juliett
Kilo
Lima
Mike`,
            minGames: 4,
            courtCount: 2,
            shuffle: false
        }), (schemaPath) => {
            required(schemaPath.names);
            required(schemaPath.minGames);
            min(schemaPath.minGames, 1);
            max(schemaPath.minGames, 10);
            required(schemaPath.courtCount);
            min(schemaPath.courtCount, 1);
            max(schemaPath.courtCount, 10);
        }
    );
    public readonly formParams = signal<FormParams>(this.getFormParams());
    private readonly matchupBuilder = inject(MatchupBuilder);

    public readonly responseResource = rxResource<Record<number, MatchupCollection>, FormParams>({
        params: () => this.formParams(),
        stream: (p) => {
            let observable: Observable<Record<number, MatchupCollection>> = of(this.matchupBuilder.getMatchups(
                p.params.names,
                p.params.minGames,
                p.params.courtCount
            ));
            return observable;
        },
    });

    public readonly selectedTab = signal<number>(0);
    public readonly selectedPlayer = signal<string | undefined>(undefined)

    private getFormParams(): FormParams {
        return {
            names: this.form.names().value().split('\n').map(n => n.trim()),
            minGames: this.form.minGames().value(),
            courtCount: this.form.courtCount().value()
        }
    }

    public onSubmit($event: SubmitEvent) {
        $event.preventDefault();
        const p = this.getFormParams();
        if (this.form.shuffle().value()) {
            shuffle(p.names);
        }
        this.formParams.set(p);
        this.selectedTab.set(1);
        this.selectedPlayer.set(undefined);
    }

    public datasourceChanged(names: string[]) {
        this.formParams.set({
            names,
            minGames: this.form.minGames().value(),
            courtCount: this.form.courtCount().value()
        });
    }

    public selectedPlayerChanged(name: string | undefined) {
        this.selectedPlayer.set(name);
    }
}

export interface FormParams {
    names: string[];
    minGames: number;
    courtCount: number;
}

interface Form {
    names: string;
    minGames: number;
    courtCount: number;
    shuffle: boolean;
}
