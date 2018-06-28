import {Component, EventEmitter, HostListener, Input, Output} from "@angular/core";

@Component({
    selector: 'loader',
    styleUrls: ['./loader.scss'],
    template: `
        <div class="green-button" [ngClass]="{'initial': started && !finished}">
            <span *ngIf="!started">{{initialLabel}}</span>
            <span class="color-white" *ngIf="started && !finished">{{inProgressLabel}}</span>
            <span *ngIf="finished">{{loadedLabel}}</span>
            <div class="loader" *ngIf="!finished" [style.width]="currentWidth+'%'"></div>
        </div>`
})
export class LoaderComponent {

    @Input('initialLabel') initialLabel;
    @Input('inProgressLabel') inProgressLabel;
    @Input('loadedLabel') loadedLabel;
    @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

    public currentWidth: number = 0;
    public started: boolean = false;
    public finished: boolean = false;

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        this.started = true;
        this.increaseWidth();
    }

    public increaseWidth() {
        if (this.currentWidth < 100) {
            this.currentWidth++;
            requestAnimationFrame(() => {
                this.increaseWidth();
            })
        } else {
            this.finished = true;
            this.loaded.emit();
        }
    }

}