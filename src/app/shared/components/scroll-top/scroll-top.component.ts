import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { scrollToPosition } from '@shared/utils/functions/scrollToPosition';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
    selector: 'app-scroll-top',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './scroll-top.component.html',
    styleUrl: './scroll-top.component.scss'
})
export class ScrollTopComponent implements OnDestroy {

    @HostListener('window:scroll', [])
    pageScroll() {
        this._documentScrollEvent.next(true);
    }

    protected buttonVisibility: boolean = false;
    private _documentScrollEvent: Subject<boolean> = new Subject();
    private _documentScrollEventSubscription: Subscription;

    constructor() {
        this._documentScrollEventSubscription = this._documentScrollEvent
            .pipe(debounceTime(30))
            .subscribe({
                next: () => this.handleButtonVisibility()
            });
    }
    ngOnDestroy(): void {
        this._documentScrollEventSubscription.unsubscribe();
    }

    handleButtonVisibility() {
        const scrolledPercentage = (window.scrollY) / (document.body.clientHeight - window.innerHeight) * 100;
        if (scrolledPercentage > 30) {
            this.buttonVisibility = true;
        } else {
            this.buttonVisibility = false;
        }
    }
    scrollToTop() {
        this.buttonVisibility = false;
        scrollToPosition("top");
    }


}
