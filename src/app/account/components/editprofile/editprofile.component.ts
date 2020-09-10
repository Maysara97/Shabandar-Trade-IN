import { ToastrService } from 'ngx-toastr'
import { Component, OnInit } from '@angular/core'
import {
    NgForm,
    FormGroup,
    FormBuilder,
    Validators,
    FormArray,
} from '@angular/forms'
import { NavigationEnd, Router } from '@angular/router'
import { User, AccountData } from '../../models/register'
import { AccountsService } from '../../services/accounts.service'
import { AuthService } from 'src/app/shared/services/auth.service'
import { MustMatch } from '../../models/matchPassword'
import { FileImage } from 'src/app/shared/models/file'
import { CountryService } from 'src/app/application/services/country.service'
import { Country } from 'src/app/application/models/country'
import { environment } from 'src/environments/environment'
import { CategoryService } from 'src/app/application/services/category.service'
import { Category } from 'src/app/application/models/category'

@Component({
    selector: 'app-editprofile',
    templateUrl: './editprofile.component.html',
    styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
    editProfileForm: FormGroup
    submitted = false
    data = false
    message: string
    profileData: User
    updateUserData: AccountData
    imageUrl: string
    files: string[] = []
    images: string[] = []
    countries: Country[]
    categories: Category[]
    env: any
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService,
        private toastr: ToastrService,
        private countryService: CountryService,
        private categoryService: CategoryService
    ) {
        this.env = environment
    }
    public mobileNumbers = [{ id: 1, mobile: '' }]
    public phoneNumbers = [{ id: 1, phone: '' }]
    ngOnInit(): void {
        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })

        // Bind all Categories
        this.categoryService.getAllCategories().subscribe((result: any) => {
            this.categories = result.data
        })
        // Get Account Data
        this.auth.getAccountDetails().subscribe((result: any) => {
            this.updateUserData = result.data
            this.files = this.updateUserData.accountAttachments
            this.images[0] = this.updateUserData.accountImage
        })

        this.editProfileForm = this.formBuilder.group({
            accountImage: [Validators.required],
            accountName: [],
            accountAttachments: [Validators.required],
            contactEmail: [],
            accountWebsite: [],
            countryId: [Validators.required],
            mission: [],
            vission: [],
            description: [],
            categoryId: [Validators.required],
            address: [],
            mobile: [],
            phone: [],
            whatsApp: [],
            weChat: [],
            zipCode: [],
        })

        if (this.profileData) {
            this.editProfileForm.patchValue(this.profileData)
        }

        if (this.updateUserData.accountImage) {
            this.images[0] = this.updateUserData.accountImage
        }

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return
            }
            window.scrollTo(0, 0)
        })
    }

    getImageURL() {
        return 'url(./assets/images/You-Trade-In/student2.png)'
    }
    get f() {
        return this.editProfileForm.controls
    }

    handleImageUpload(files: FileImage[]) {
        this.editProfileForm.patchValue({
            accountImage: files[0].imageFile,
        })
    }

    // Upload Files
    handleFileUpload(files: FileImage[]) {
        this.editProfileForm.patchValue({
            accountAttachments: files.map((file) => file.imageFile),
        })
    }
    handleFileRemove(files: FileImage[]) {
        this.editProfileForm.patchValue({
            accountAttachments: files.map((file) => file.imageFile),
        })
    }

    onSubmit(form) {
        this.submitted = true
        let mobileResults: any[] = []
        this.mobileNumbers.forEach((element) => {
            mobileResults.push(element.mobile)
        })
        let phoneResults = []
        this.phoneNumbers.forEach((element) => {
            phoneResults.push(element.phone)
        })
        this.auth
            .updateProfile(form, mobileResults, phoneResults)
            .subscribe((result: any) => {
                if (result.isSucceeded) {
                    this.router.navigate(['/account/owner'])
                } else {
                    this.toastr.error(result.errors)
                }
            })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }

    addMobileNumber() {
        this.mobileNumbers.push({
            id: this.mobileNumbers.length + 1,
            mobile: '',
        })
    }
    removeMobile(i: number) {
        this.mobileNumbers.splice(i, 1)
    }
    addPhoneNumber() {
        this.phoneNumbers.push({
            id: this.phoneNumbers.length + 1,
            phone: '',
        })
    }
    removePhone(i: number) {
        this.phoneNumbers.splice(i, 1)
    }
}
