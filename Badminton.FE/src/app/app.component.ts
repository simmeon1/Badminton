import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
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
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogRef,
    MatDialog,
    MatDialogTitle
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
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
        MatInput,
        MatCheckbox,
        MatButton,
        FormField,
        Players,
        MatTabGroup,
        MatTab,
        Matches,
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
    private readonly dialog = inject(MatDialog);

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

        const nameCheckboxes = names.map(n => ({ name: n, checked: true } as NameCheckbox));

        this.form = form(signal<Form>({
                names: nameCheckboxes,
                minGames: 4,
                courtCount: 2,
                shuffle: false,
            }), (schemaPath) => {
                required(schemaPath.minGames);
                min(schemaPath.minGames, 1);
                max(schemaPath.minGames, 10);
                required(schemaPath.courtCount);
                min(schemaPath.courtCount, 1);
                max(schemaPath.courtCount, 10);
            }
        )
    }

    public readonly hasCheckedPlayers = computed(() => {
        return this.form.names().value().some(n => n.checked);
    });

    private getFormParams(): FormParams {
        const names = this.form.names().value()
            .filter(n => n.checked)
            .map(n => n.name);
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

    public playersReordered(orderedNames: string[]) {
        // Create a map of names to their checkbox state
        const currentNames = this.form.names().value();
        const nameStateMap = new Map(currentNames.map(n => [n.name, n.checked]));

        // Reorder checkboxes to match the table order, preserving their checked state
        const reorderedCheckboxes = orderedNames
            .filter(name => nameStateMap.has(name))
            .map(name => ({
                name,
                checked: nameStateMap.get(name) ?? false
            } as NameCheckbox));

        this.form.names().value.set(reorderedCheckboxes);
        this.selectedTab.set(0);
    }

    public openAddDialog(): void {
        const dialogRef = this.dialog.open(AddNamesDialog, {
            data: { namesText: '' }
        });

        dialogRef.afterClosed().subscribe((namesText: string | undefined) => {
            if (namesText && namesText.trim()) {
                const newNames = namesText.split('\n')
                    .map(n => n.trim())
                    .filter(n => n.length > 0);

                const currentNames = this.form.names().value();
                const existingNameSet = new Set(currentNames.map(n => n.name));

                const uniqueNewNames = newNames.filter(n => !existingNameSet.has(n));
                const nameCheckboxes = uniqueNewNames.map(n => ({ name: n, checked: true } as NameCheckbox));

                this.form.names().value.set([...currentNames, ...nameCheckboxes]);
            }
        });
    }

    public clearAllPlayers(): void {
        this.form.names().value.set([]);
    }
}

export interface FormParams {
    names: string[];
    minGames: number;
    courtCount: number;
}

interface Form {
    names: NameCheckbox[];
    minGames: number;
    courtCount: number;
    shuffle: boolean;
}

interface NameCheckbox {
    name: string
    checked: boolean
}

@Component({
    selector: 'add-names-dialog',
    template: `
        <h2 mat-dialog-title>Add Players</h2>
        <mat-dialog-content>
            <mat-form-field>
                <mat-label>Add players, one per line</mat-label>
                <textarea matInput cdkTextareaAutosize [(ngModel)]="namesText"></textarea>
            </mat-form-field>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button matButton (click)="onCancel()">Cancel</button>
            <button matButton [mat-dialog-close]="namesText" cdkFocusInitial>Ok</button>
        </mat-dialog-actions>
    `,
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButton,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
        CdkTextareaAutosize,
    ]
})
export class AddNamesDialog {
    readonly dialogRef = inject(MatDialogRef<AddNamesDialog>);
    readonly data = inject<AddNamesDialogData>(MAT_DIALOG_DATA);
    namesText = this.data.namesText;

    onCancel(): void {
        this.dialogRef.close();
    }
}

interface AddNamesDialogData {
    namesText: string;
}

