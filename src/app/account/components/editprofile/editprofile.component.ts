import { ToastrService } from 'ngx-toastr'
import { Component, OnInit } from '@angular/core'
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms'
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
            // debugger
            this.updateUserData = result.data
            this.files = this.updateUserData.accountAttachments
            this.images[0] = this.updateUserData.accountImage
        })

        this.editProfileForm = this.formBuilder.group({
            accountImage: [Validators.required],
            accountMobile: [],
            accountName: [],
            accountAttachments: [Validators.required],
            contactEmail: [],
            accountWebsite: [],
            countryId: [Validators.required],
            mission: [],
            vission: [],
            description: [],
            categoryId: [Validators.required],
            // address: [],
            // zipCode: []
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
    onSelectFile(event) {
        // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader()

            reader.readAsDataURL(event.target.files[0]) // read file as data url

            reader.onload = (event) => {
                this.imageUrl = event.target.result.toString()
            }
        }
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
        this.auth.updateProfile(form).subscribe((result: any) => {
            if (result) {
                // debugger
                this.router.navigate(['/account/owner'])
            } else {
                this.toastr.error('Error')
            }
        })
    }

    getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}
