import {
    Component,
    OnInit
} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
    templateUrl: 'top-navigation.component.html',
    selector: 'top-navigation'
})
export class TopNavigationComponent {


    public routerEventsSub = null;
    public showGpsSearchInput = false;

    ngOnInit() {
        this.routerEventsSub = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.showGpsSearchInput = event.urlAfterRedirects === '/restaurant-listing';
            }
        });
    }

    ngOnDestroy() {
        if (this.routerEventsSub) {
            this.routerEventsSub.unsubscribe();
        }
    }

    public expandVisible: boolean = false;

    constructor(public router: Router,
                public location: Location) {
        this.router = router;
    }

    public goBack() {
        this.location.back();
    }

    public toggleTopNavigation(): void {
        this.expandVisible = !this.expandVisible;
    }

}
