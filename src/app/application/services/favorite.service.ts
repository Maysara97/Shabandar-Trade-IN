import { BaseService } from 'src/app/shared/core/base.service'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { Favorite } from '../models/favorite'

@Injectable({ providedIn: 'root' })
export class FavoriteService extends BaseService<any> {
    constructor(injector: Injector) {
        super(injector)
    }

    createFavorite(favorite: Favorite) {
        return this.post('Favorite', favorite)
    }
    deleteFavorite(favoriteId: string) {
        return this.remove('Favorite', favoriteId)
    }
}
