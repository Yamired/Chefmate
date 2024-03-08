import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CreateIngredientComponent } from './create-ingredient/create-ingredient.component';
import { IngredientService } from '@shared/services/ingredient.service';
import { IngredientResponse } from '@shared/utils/types/types';
import { ListResult, RecordModel } from 'pocketbase';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { ScrollTopComponent } from '@shared/components/scroll-top/scroll-top.component';
import { scrollToPosition } from '@shared/utils/functions/scrollToPosition';
import { FormsModule } from '@angular/forms';
import { changeModalVisibility } from '@shared/utils/functions/changeModalVisibility';

@Component({
    selector: 'app-ingredients',
    standalone: true,
    imports: [
        CreateIngredientComponent,
        CommonModule,
        FormsModule,
        PaginationComponent,
        ScrollTopComponent
    ],
    templateUrl: './ingredients.page.html',
    styleUrl: './ingredients.page.scss'
})
export class IngredientsPage implements OnInit, OnDestroy {

    @ViewChild('deleteIngredientsModal') deleteIngredientsModal: ElementRef | undefined = undefined;

    // Pagination
    protected actualSearchPage: number = 1;
    protected actualSearchItemsPerPage: number = 5;
    protected actualSearchPageNumber: number = 0;

    // Évènements
    private _pageChangedEvent: Subject<number[]> = new Subject();
    private _pageChangedEventSubscription: Subscription;
    private _searchIngredientEvent: Subject<void> = new Subject();
    private _searchIngredientEventSubscription: Subscription;

    // Gestion des ingrédients
    protected selectedIngredients: IngredientResponse[] = []
    protected ingredientList: IngredientResponse[] = [];
    protected searchIngredientValue: string | undefined = undefined;
    protected totalIngredientsCount: number = 0;
    protected globalSelectState: boolean = false;


    constructor(private readonly _ingredientService: IngredientService) {
        this._pageChangedEventSubscription = this._pageChangedEvent
            .pipe(debounceTime(300))
            .subscribe({
                next: (pageAndItems: number[]) => this.fetchIngredientsList(pageAndItems[0], pageAndItems[1])
            });
        this._searchIngredientEventSubscription = this._searchIngredientEvent
            .pipe(debounceTime(300))
            .subscribe({
                next: () => {
                    this.fetchIngredientsList(1, this.actualSearchItemsPerPage);
                }
            });
    }
    ngOnInit(): void {
        this.fetchIngredientsList(this.actualSearchPage, this.actualSearchItemsPerPage);
    }
    ngOnDestroy(): void {
        this._pageChangedEventSubscription.unsubscribe();
        this._searchIngredientEventSubscription.unsubscribe();
    }


    fetchIngredientsList(page: number, itemsPerPage: number): void {
        this.ingredientList = [];
        this.selectedIngredients = [];
        this.actualSearchPage = page;
        this.actualSearchItemsPerPage = itemsPerPage;

        this._ingredientService.listIngredients(page, itemsPerPage, this.searchIngredientValue)
            .then((response: ListResult<RecordModel>) => {
                this.actualSearchPageNumber = response.totalPages;
                this.totalIngredientsCount = response.totalItems;

                response.items.forEach((row: RecordModel) => {
                    const ingredient: IngredientResponse = {
                        ...row,
                        Picture: row["Picture"],
                        Name: row["Name"],
                    } as IngredientResponse;
                    this.addIngredientToList(ingredient);
                    this.getFileURL(ingredient, ingredient.Picture);
                });
            });
    }
    addIngredientToList(ingredient: IngredientResponse, creationMode: "user" | undefined = undefined): void {
        if(this.totalIngredientsCount / this.actualSearchItemsPerPage >= this.actualSearchPageNumber && creationMode === "user") {
            this.fetchIngredientsList(this.actualSearchPage, this.actualSearchItemsPerPage);
            return;
        }
        if(creationMode === "user") {
            this.totalIngredientsCount += 1;
            if (this.actualSearchPage === this.actualSearchPageNumber) {
                this.ingredientList.push(ingredient);
            }
        } else {
            this.ingredientList.push(ingredient);
        }

    }
    deleteIngredients(): void {
        this.selectedIngredients.forEach((ingredient: IngredientResponse) => {
            this._ingredientService.deleteIngredient(ingredient.id)
                .catch((err: Error) => {
                    console.error(err);
                });
        });
        this.globalSelectState = false;
        this.selectedIngredients = [];
        this._pageChangedEvent.next([1, this.actualSearchItemsPerPage]);
    }
    selectIngredients(e: Event, index: number | undefined = undefined, all: boolean | undefined = undefined): void {
        const checked: boolean = (e.target as HTMLInputElement).checked;

        if ((index !== undefined && index !== null) && checked) { this.selectedIngredients.push(this.ingredientList[index]); }
        if ((index !== undefined && index !== null) && !checked) { this.selectedIngredients = this.selectedIngredients.filter((ingr) => ingr !== this.ingredientList[index]); }

        if (all && checked) { this.selectedIngredients = this.ingredientList; }
        if (all && !checked) { this.selectedIngredients = []; }
    }


    getFileURL(record: IngredientResponse, file: string): string {
        return this._ingredientService.getFileURL(record as RecordModel, file);
    }
    changePageEvent(page: number, itemsPerPage: number): void {
        this.ingredientList = [];
        this.selectedIngredients = [];
        this._pageChangedEvent.next([page, itemsPerPage]);
    }
    changeSearchValue(e: Event) {
        const value: string = (e.target as HTMLInputElement)?.value;
        this._searchIngredientEvent.next();
    }
    isSelected(ingredient: IngredientResponse): boolean {
        return this.selectedIngredients.findIndex((ing) => ing === ingredient) >= 0;
    }
    scrollBottom(): void {
        scrollToPosition("bottom");
    }
    changeDeleteModalVisibility(mode: "hide" | "show"): void {
        if(!this.deleteIngredientsModal) { return; }
        changeModalVisibility(this.deleteIngredientsModal.nativeElement, mode);
    }

}
