import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { SharedModule } from './shared/shared.module'
import { ToastrModule } from 'ngx-toastr'
import { JwtModule } from '@auth0/angular-jwt'
import { Ng2SearchPipeModule } from 'ng2-search-filter'
import { CarouselModule } from 'ngx-owl-carousel-o'
import { FormsModule } from '@angular/forms'
import { TagInputModule } from 'ngx-chips'

export function tokenGetter() {
    return localStorage.getItem('token')
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({
            config: {
                // tslint:disable-next-line:object-literal-shorthand
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:5001'],
            },
        }),
        Ng2SearchPipeModule,
        CarouselModule,
        FormsModule,
        TagInputModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
