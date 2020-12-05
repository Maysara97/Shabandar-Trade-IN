import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ToastrModule } from 'ngx-toastr'
import { JwtModule } from '@auth0/angular-jwt'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { FormsModule } from '@angular/forms'
import { TagInputModule } from 'ngx-chips'
import { NotifierModule, NotifierOptions } from 'angular-notifier'
import { StorageServiceModule } from  'ngx-webstorage-service';

export function tokenGetter() {
    return localStorage.getItem('token')
}
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: 'right',
            distance: 12,
        },
        vertical: {
            position: 'top',
            distance: 12,
            gap: 10,
        },
    },
    theme: 'material',
    behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
    },
    animations: {
        enabled: true,
        show: {
            preset: 'slide',
            speed: 300,
            easing: 'ease',
        },
        hide: {
            preset: 'fade',
            speed: 300,
            easing: 'ease',
            offset: 50,
        },
        shift: {
            speed: 300,
            easing: 'ease',
        },
        overlap: 150,
    },
}
@NgModule({
    declarations: [AppComponent],
    imports: [
        StorageServiceModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: [
                    'localhost:5001',
                    'api.shahbandartrade.com',
                ],
            },
        }),
        Ng2SearchPipeModule,
        CarouselModule,
        FormsModule,
        TagInputModule,
        NotifierModule.withConfig(customNotifierOptions),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
