import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

    @Input({required: true}) maxPages: number = 0;
    @Output() pageValueEvent: EventEmitter<number> = new EventEmitter();
    @Output() itemsPerPageValueEvent: EventEmitter<number> = new EventEmitter();
    protected actualPage: number = 1;
    protected paginators: number[] = [1, 2, 3];

    constructor() {}

    changePage(increment: number, pageNumberToSet: number | undefined = undefined) {
        if (pageNumberToSet) {
            this.actualPage = pageNumberToSet;
            this.mutatePaginatorValues();
            return;
        }
        if (this.actualPage + increment < 1 || this.actualPage + increment > this.maxPages) {
            return;
        }
        this.actualPage += increment;
        this.mutatePaginatorValues();
    }

    mutatePaginatorValues() {
        this.pageValueEvent.emit(this.actualPage);
        if (this.maxPages <= 4) {
            return;
        }
        if (this.actualPage >= this.maxPages - 2) {
            this.paginators = [this.maxPages - 4, this.maxPages - 3, this.maxPages - 2];
            return;
        }
        if (this.actualPage === 1) {
            this.paginators = [1, 2, 3];
            return;
        }
        this.paginators = [this.actualPage - 1, this.actualPage, this.actualPage + 1];
    }

    itemsPerPageEdit(event: Event) {
        const target: HTMLSelectElement = event.target as HTMLSelectElement;
        if (!parseInt(target.value)) { return; }
        this.itemsPerPageValueEvent.emit(parseInt(target.value));
    }

}
