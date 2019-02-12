import { 
    Component, 
    OnInit 
} from '@angular/core';
import { PrimeNumbersService } from 'src/app/services/PrimeNumbersService';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { finalize, takeUntil, catchError } from 'rxjs/operators';
import { Subject, empty } from 'rxjs';

@Component({
  selector: 'pn-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    private ngUnsubscribe = new Subject();
    public primeNumbersForm: FormGroup;
    public limitControl: FormControl;
    public sum: number;
    public detailedSum: string;
    public loading: boolean;
    public showError: boolean;
    public showResults: boolean;
    public showDetails: boolean;

    constructor( 
        private formBuilder: FormBuilder,
        private primeNumbersService: PrimeNumbersService,
        ) {
    }

    ngOnInit() {
        this.limitControl = new FormControl( '', [Validators.required, Validators.pattern('^[0-9]*$'),] )
        this.primeNumbersForm = this.formBuilder.group({
            limit: this.limitControl
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public onSubmit(): void {
        if( this.primeNumbersForm.invalid ) { return; }

        const limit = this.limitControl.value;
        this.limitControl.disable();
        this.loading = true;
        this.showError = false;
        this.showResults = false;
        this.showDetails = false;

        this.primeNumbersService.findSum( limit )
            .pipe(
                takeUntil( this.ngUnsubscribe ),
                finalize( () => {
                    this.loading = false;
                    this.limitControl.enable();   
                }),
                catchError( () => {
                    this.showError = true
                    return empty();
                })
            )
            .subscribe( (response) => {
                console.log(response);
                this.showResults = response.primes.length > 0;
                this.sum = response.sum;
                this.detailedSum = `${ response.primes.join(' + ') } = ${this.sum}`;
            } );
    }
}
