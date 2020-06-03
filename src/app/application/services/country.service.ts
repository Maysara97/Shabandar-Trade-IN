import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class CountryService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    getAllCountries(): Observable<Country[]> {
        return this.getAll('Country/AllCountries')
    }
}
