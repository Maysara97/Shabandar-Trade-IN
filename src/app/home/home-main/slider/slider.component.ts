import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core'
import { AuthService } from 'src/app/shared/services/auth.service'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
    isLoggedIn
    myBackgroundImageUrl = './assets/images/You-Trade-In/slider.png'
    subCategoryModal: BsModalRef

    constructor(
        private auth: AuthService,
        private modalService: BsModalService
    ) {}

    ngOnInit() {
        this.auth.isAuthed.subscribe((result) => {
            this.isLoggedIn = result
        })
    }
    @HostBinding('style.backgroundImage')
    getBackgroundImageUrl() {
        return `url(${this.myBackgroundImageUrl})`
    }

    subCategory(template: TemplateRef<any>) {
        this.subCategoryModal = this.modalService.show(template, {
            class: 'modal-md',
        })
    }
}
