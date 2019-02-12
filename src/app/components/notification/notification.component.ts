import { 
    Component,
    EventEmitter, 
    Input,
    Output
} from '@angular/core';
import { PrimeNumbersService } from 'src/app/services/PrimeNumbersService';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize, takeUntil, catchError } from 'rxjs/operators';
import { Subject, empty } from 'rxjs';

@Component({
  selector: 'pn-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
    @Input() message: string;
    @Output() close = new EventEmitter<void>();

    constructor() {
    }
}
