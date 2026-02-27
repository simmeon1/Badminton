import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialog,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatSelectionList, MatListOption } from '@angular/material/list';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Form, NameCheckbox, QueryParams } from '../app.component';

@Component({
  selector: 'game-form',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
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
    MatCardContent,
  ],
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameForm {
  public readonly form = input.required<FieldTree<Form>>();
  private readonly dialog = inject(MatDialog);
  public readonly isLoading = input.required<boolean>();
  public readonly formSubmitted = output<QueryParams>();

  public openAddDialog(): void {
    const dialogRef = this.dialog.open(AddNamesDialog, {
      data: { namesText: '' },
    });

    dialogRef.afterClosed().subscribe((namesText: string | undefined) => {
      if (namesText?.trim()) {
        const newNames = namesText
          .split('\n')
          .map((n) => n.trim())
          .filter((n) => n.length > 0);

        const currentNames = this.form().names().value();
        const existingNameSet = new Set(currentNames.map((n) => n.name));

        const uniqueNewNames = newNames.filter((n) => !existingNameSet.has(n));
        const nameCheckboxes = uniqueNewNames.map(
          (n) => ({ name: n, checked: true }) as NameCheckbox,
        );

        this.form()
          .names()
          .value.set([...nameCheckboxes, ...currentNames]);
      }
    });
  }

  public clearAllPlayers(): void {
    this.form().names().value.set([]);
  }

  public onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    const p = this.buildQueryParams();
    this.formSubmitted.emit(p);
  }

  private buildQueryParams(): QueryParams {
    const names = this.form()
      .names()
      .value()
      .filter((n) => n.checked)
      .map((n) => n.name);
    return {
      names,
      minGames: this.form().minGames().value(),
      courtCount: this.form().courtCount().value(),
    };
  }

  public readonly hasCheckedPlayers = computed(() => {
    return this.form()
      .names()
      .value()
      .some((n) => n.checked);
  });

  public toggleCheckbox(checkboxSignal: FieldTree<boolean, string>) {
    checkboxSignal().value.set(!checkboxSignal().value());
  }
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
      <button matButton [mat-dialog-close]="namesText" cdkFocusInitial>OK</button>
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
  ],
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
