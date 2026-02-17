import {afterNextRender, ChangeDetectionStrategy, Component, inject, Injector, signal, ViewChild} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {CdkTextareaAutosize, TextFieldModule} from "@angular/cdk/text-field";
import {FieldTree, form, FormField, max, min, required} from "@angular/forms/signals";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
import shuffle from "knuth-shuffle-seeded";
import {Players} from "./players/players.component";
import {Matches} from './matches/matches.component';
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {rxResource} from '@angular/core/rxjs-interop';
import {of} from 'rxjs';
import {MatchupBuilder, MatchupCollection} from './matchup-builder.service';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader, MatExpansionPanelTitle
} from '@angular/material/expansion';

@Component({
    selector: 'app-root',
    imports: [
        MatFormField,
        MatLabel,
        CdkTextareaAutosize,
        TextFieldModule,
        MatInput,
        MatCheckbox,
        MatButton,
        FormField,
        Players,
        MatTabGroup,
        MatTab,
        Matches,
        MatRadioGroup,
        MatRadioButton,
        MatAccordion,
        MatExpansionPanel,
        MatExpansionPanelDescription,
        MatExpansionPanelHeader,
        MatExpansionPanelTitle
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class App {
    public readonly form: FieldTree<Form>;
    public readonly formParams = signal<FormParams | undefined>(undefined);
    private readonly matchupBuilder = inject(MatchupBuilder);

    public readonly responseResource = rxResource<Record<number, MatchupCollection>, FormParams | undefined>({
        params: () => this.formParams(),
        stream: (p) =>
            of(this.matchupBuilder.getMatchups(
                p.params.names,
                p.params.minGames,
                p.params.courtCount
            )),
    });

    public readonly selectedTab = signal<number>(0);
    public readonly selectedPlayer = signal<string | undefined>(undefined);
    private _injector = inject(Injector);

    public constructor() {
        const names = [
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
        ]

        this.form = form(signal<Form>({
                names: [],
                namesText: names.join('\n'),
                minGames: 4,
                courtCount: 2,
                shuffle: false,
                submitText: true
            }), (schemaPath) => {
                required(schemaPath.namesText);
                required(schemaPath.minGames);
                min(schemaPath.minGames, 1);
                max(schemaPath.minGames, 10);
                required(schemaPath.courtCount);
                min(schemaPath.courtCount, 1);
                max(schemaPath.courtCount, 10);
            }
        )
    }

    private getFormParams(): FormParams {
        const names = this.form.submitText().value() ?
            this.form.namesText().value().split('\n').map(n => n.trim()) :
            this.form.names().value().filter(n => n.checked).map(n => n.name);
        return {
            names,
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

    public radioChanged(submitText: boolean) {
        if (submitText) {
            return;
        }
        const names = this.form.namesText().value().split('\n');
        this.form.names().value.set(names.map(n => ({ name: n, checked: true } as NameCheckbox)));
    }

    public updateInput(names: string[]) {
        this.selectedTab.set(0);
        this.form.submitText().value.set(true);
        this.form.namesText().value.set(names.join('\n'));
    }
}

export interface FormParams {
    names: string[];
    minGames: number;
    courtCount: number;
}

interface Form {
    names: NameCheckbox[];
    namesText: string;
    minGames: number;
    courtCount: number;
    shuffle: boolean;
    submitText: boolean;
}

interface NameCheckbox {
    name: string
    checked: boolean
}
