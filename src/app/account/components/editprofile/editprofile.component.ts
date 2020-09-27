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
import { User, AccountData, Categories } from '../../models/register'
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
    mainCategories: Category[]
    mainCategory: string
    categoryParentId
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
    // public categorySelections: Object[] = [{ categoryId: '' }]
    public categorySelections = [{ categoryId: '' }]
    public placeHolder: Categories[] = [{ categoryId: '' }]
    categoryId
    public localFields: Object = {
        text: 'categoryName',
        value: 'categoryId',
    }
    public localWaterMark: string = 'Select Multiple Category'
    ngOnInit(): void {
        // Bind all Countries
        this.countryService.getAllCountries().subscribe((result: any) => {
            this.countries = result.data
        })

        // Bind all Categories
        this.categoryService.getAllParents().subscribe((result: any) => {
            this.mainCategories = result.data
        })
        // Get Account Data
        this.auth.getAccountDetails().subscribe((result: any) => {
            this.updateUserData = result.data

            this.files = this.updateUserData.accountAttachments

            if (this.updateUserData.accountImage) {
                this.images[0] = this.updateUserData.accountImage
            }
            this.categoryService
                .getCategoriesByParentId(this.updateUserData.categoryId)
                .subscribe((result: any) => {
                    this.categories = result.data
                })

            this.mainCategory = this.updateUserData.categoryName
            if (this.updateUserData.phone) {
                // this.updateUserData.phone = []
                this.phoneNumbers.forEach((element) => {
                    this.updateUserData.phone.push(element.phone)
                })
            }
            if (this.updateUserData.mobile) {
                // this.updateUserData.mobile = []
                this.mobileNumbers.forEach((element) => {
                    this.updateUserData.mobile.push(element.mobile)
                })
            }
        })

        this.editProfileForm = this.formBuilder.group({
            accountImage: [null, Validators.required],
            accountName: [],
            accountAttachments: [],
            contactEmail: [],
            accountWebsite: [],
            countryId: [],
            mission: [],
            vission: [],
            description: [],
            address: [],
            mobile: [],
            phone: [],
            whatsApp: [],
            weChat: [],
            zipCode: [],
            categories: [null, Validators.required],
            categoryId: [],
        })

        if (this.profileData) {
            this.editProfileForm.patchValue(this.profileData)
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

        let categoriesResult = []
        this.categorySelections.forEach((element) => {
            categoriesResult.push({ categoryId: element })
        })
        const images = this.images[0]
        if (!this.updateUserData.accountImage) {
            this.updateUserData.accountImage = images
        }

        this.auth
            .updateProfile(form, mobileResults, phoneResults, categoriesResult)
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
