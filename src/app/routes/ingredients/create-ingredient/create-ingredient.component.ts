import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IngredientService } from '@shared/services/ingredient.service';
import { changeModalVisibility } from '@shared/utils/functions/changeModalVisibility';
import { GroupRecord, GroupResponse, IngredientResponse, SpecRecord, SpecResponse } from '@shared/utils/types/types';
import { RecordModel } from 'pocketbase';

type Test = GroupRecord & { SpecList: SpecRecord[]};

@Component({
    selector: 'app-create-ingredient',
    standalone: true,
    imports: [ReactiveFormsModule,CommonModule],
    templateUrl: './create-ingredient.component.html',
    styleUrl: './create-ingredient.component.scss'
})
export class CreateIngredientComponent {


    @ViewChild('editIngredientModal') editIngredientModal: ElementRef | undefined = undefined;
    @Output() newIngredientEvent: EventEmitter<IngredientResponse> = new EventEmitter();
    private _file: File | undefined = undefined
    protected ingredientForm: FormGroup;

    protected groups: Test[] = [];
    // protected specs: SpecResponse[] = [];

    constructor(
        private readonly _ingredientService: IngredientService
    ) {
        this.ingredientForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
            ]),
            picture: new FormControl(null, [
                Validators.required,
            ]),
        });

    }

    createIngredient(): void {
        if (!this.name?.value || !this._file) { return; }
        const data = { "Name": this.name.value, "Picture": this._file }
        this._ingredientService.createIngredient(data)
            .then((response: RecordModel) => {
                const newIngredient: IngredientResponse = {
                    ...response,
                    Name: response["Name"],
                    Picture: response["Picture"],
                } as IngredientResponse;
                this.newIngredientEvent.emit(newIngredient);
                this.changeEditModalVisibility("hide");
            });
    }
    createGroup(): void {
        const group: Test = {Ingredient: 'test', Name: 'Test', Specs: ['test'], SpecList: []};
        this.groups.push(group);
    }
    createSpec(index: number) {
        const spec: SpecRecord = { Group: '', IsStrict: true, Name: 'Spec' }
        this.groups[index].SpecList.push(spec)
    }


    storeImage(e: Event): void {
        const fileInput: HTMLInputElement = e.target as HTMLInputElement;
        const file: File | null | undefined = fileInput.files?.item(0);

        if (file === undefined || file === null) { return ;}
        this._file = file;
    }
    changeEditModalVisibility(mode: "hide" | "show"): void {
        if(!this.editIngredientModal) { return; }
        changeModalVisibility(this.editIngredientModal.nativeElement, mode);
    }


    get name() { return this.ingredientForm.get('name'); }
    get picture() { return this.ingredientForm.get('picture'); }

}
