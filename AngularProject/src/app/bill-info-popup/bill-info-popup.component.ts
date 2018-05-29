import {
    Component,
    HostListener,
    Output,
    Input,
    EventEmitter,
    OnInit
} from "@angular/core";

@Component({
    selector: 'bill-info-popup',
    templateUrl: './bill-info-popup-component.html',
    styleUrls: ['./bill-info-popup.component.scss'],
    host: {class: 'basic-overlay modal-overlay'}
})

export class BillInfoPopupComponent implements OnInit {
    public sharesForSelfArrowPosition: string = '';
    public arrowWidth = 15;
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    @Input('ticketPayableData') ticketPayableData: object = {};

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        if (event.target.tagName.toLowerCase() === 'bill-info-popup') {
            this.closeModal.emit();
        }
    }

    /**
     * On init separate the data
     */
    public ngOnInit(): void {
        console.log(this.ticketPayableData);
    }

    public toggleSelectedParticipant(participantIndex: number) {
        this.data.participants.forEach((participant, index) => {
            participant['selected'] = participantIndex === index;
        })
    }

    public toggleSelectedShareCount(shareIndex: number) {
        this.data.shares.forEach((share, index) => {
            share['selected'] = shareIndex === index;
        })
    }

    public setSharesForSelf(shareIndex: number) {
        this.data.shareOptions.forEach((share, index) => {
            share['selected'] = shareIndex === index;
        })
    }

    /**
     * Close model when clicking on white chec
     */
    public goToEditMode(): void {
        this.closeModal.emit();
    }

    public data = {
        total: '154.5лв',
        participants: [
            {
                initials: 'НВ'
            },
            {
                initials: 'РВ'
            },
            {
                initials: 'СВ',
                self: true
            }
        ],
        shares: [
            {
                count: '2'
            },
            {
                count: '3'
            },
            {
                count: '4'
            },
            {
                count: '5'
            },
            {
                count: '6'
            }
        ],
        shareOptions: [
            {
                count: '1'
            },
            {
                count: '2'
            },
            {
                count: '3'
            },
            {
                count: '4'
            },
            {
                count: '5'
            }
        ]
    }

}
