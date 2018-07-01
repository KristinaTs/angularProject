import {
    Component,
    HostListener,
    Output,
    Input,
    EventEmitter,
    OnInit
} from "@angular/core";

@Component({
    selector: 'info-popup',
    templateUrl: './info-popup.component.html',
    styleUrls: ['./info-popup.component.scss'],
    host: {class: 'basic-overlay modal-overlay'}
})

export class InfoPopupComponent implements OnInit {
    public sharesForSelfArrowPosition: string = '';
    public arrowWidth = 15;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    @Input('billSummary') billSummary;
    @Input('currentUser') currentUser;

    public selectedUserID = null;
    public selectedUserInformation = '';


    public data = {
        "id": 1,
        "password": "1293",
        "participants": [
            {
                "shortName": "GV",
                "fullName": "Georgi Vladimirov",
                "isMe": true,
                "totalPrice": 0,
                id:1
            },
            {
                "shortName": "AA",
                "fullName": "Aleksandar Avramov",
                "isMe": false,
                "totalPrice": 0,
                id:2
            }
        ]
    };

    public findCurrentUser(): void {
        let participants = this.data.participants;
        let indexOfCurrentUser = participants.map(user => user.id).indexOf(this.currentUser.id);

    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        if (event.target.tagName.toLowerCase() === 'info-popup') {
            this.closeModal.emit();
        }
    }

    /**
     * On init separate the data
     */
    public ngOnInit(): void {
        this.data = this.billSummary;
        console.log("Here: ",this.currentUser);
        this.selectedUserID = this.currentUser.id;
        this.toggleSelectedParticipant(0);
    }

    public toggleSelectedParticipant(participantIndex: number) {
        let participant = this.data.participants[participantIndex];
        this.selectedUserID = participant.id;
        this.selectedUserInformation = `${participant.fullName}: ${participant.totalPrice / 100} лв`;
    }

    public addParticipant() {

}

    // public toggleSelectedShareCount(shareIndex: number) {
    //     this.data.shares.forEach((share, index) => {
    //         share['selected'] = shareIndex === index;
    //     })
    // }
    //
    // public setSharesForSelf(shareIndex: number) {
    //     this.data.shareOptions.forEach((share, index) => {
    //         share['selected'] = shareIndex === index;
    //     })
    // }

    /**
     * Close model when clicking on white chec
     */
    public goToEditMode(): void {
        this.closeModal.emit();
    }

}
