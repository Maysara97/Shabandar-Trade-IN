import { environment } from 'src/environments/environment'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FileImageFields } from '../models/file'
import { FormGroup, FormControl, Validators } from '@angular/forms'

class BaseComponent {
    env: any
    constructor(protected _snackBar: MatSnackBar) {
        this.env = environment
    }

    public getFilePath(fileName: string): string {
        return `${this.env.file_path}${fileName}`
    }
}

export default BaseComponent
