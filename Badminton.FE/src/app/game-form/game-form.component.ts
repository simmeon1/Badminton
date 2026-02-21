import {ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FieldTree, form, FormField, min, required} from "@angular/forms/signals";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatButton} from "@angular/material/button";
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
import {MatSelectionList, MatListOption} from "@angular/material/list";
import {MatCard, MatCardContent} from '@angular/material/card';
import shuffle from 'knuth-shuffle-seeded';
import {QueryParams} from '../app.component';

@Component({
  selector: 'game-form',
  imports: [
      MatFormField,
      MatLabel,
      MatInput,
      MatCheckbox,
      MatButton,
      MatSelectionList,
      MatListOption,
      FormField,
      MatAccordion,
      MatExpansionPanel,
      MatExpansionPanelDescription,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      MatCard,
      MatCardContent
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameForm {
    public readonly form: FieldTree<Form>;
    private readonly dialog = inject(MatDialog);
    public readonly updatedNames = input.required<string[]>();
    public readonly isLoading = input.required<boolean>();
    public readonly formSubmitted = output<QueryParams>();

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
                shuffle: false,
            }), (schemaPath) => {
                required(schemaPath.minGames);
                min(schemaPath.minGames, 1);
                required(schemaPath.courtCount);
                min(schemaPath.courtCount, 1);
            }
        )

        // effect(() => {
        //     // Create a map of names to their checkbox state
        //     const currentNames = this.form.names().value();
        //     const nameStateMap = new Map(currentNames.map(n => [n.name, n.checked]));
        //
        //     // Reorder checkboxes to match the table order, preserving their checked state
        //     const reorderedCheckboxes = this.updatedNames()
        //         .filter(name => nameStateMap.has(name))
        //         .map(name => ({
        //             name,
        //             checked: nameStateMap.get(name) ?? false
        //         } as NameCheckbox));
        //
        //     this.form.names().value.set(reorderedCheckboxes);
        // });
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

                this.form.names().value.set([...nameCheckboxes, ...currentNames]);
            }
        });
    }

    public clearAllPlayers(): void {
        this.form.names().value.set([]);
    }

    public onSubmit($event: SubmitEvent) {
        $event.preventDefault();
        const p = this.buildQueryParams();
        if (this.form.shuffle().value()) {
            shuffle(p.names);
        }
        this.formSubmitted.emit(p)
    }

    private buildQueryParams(): QueryParams {
        const names = this.form.names().value()
            .filter(n => n.checked)
            .map(n => n.name);
        return {
            names,
            minGames: this.form.minGames().value(),
            courtCount: this.form.courtCount().value()
        }
    }

    public readonly hasCheckedPlayers = computed(() => {
        return this.form.names().value().some(n => n.checked);
    });

    // https://github.com/angular/components/issues/15477
    // mat-list-option doesn't update its value. List needs to be rebuilt
    public toggleCheckbox(i: number) {
        const checkboxes = this.form.names().value();
        const checkbox = checkboxes[i];
        checkbox.checked = !checkbox.checked;
        this.form.names().value.set([...checkboxes])
    }
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
