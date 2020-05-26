import { MatDialog } from '@angular/material/dialog'
import { FileImage, FilePond } from './../../models/file'
import {
    Component,
    OnInit,
    ViewChild,
    Output,
    EventEmitter,
    Input,
} from '@angular/core'
import { FilePondOptionProps } from 'filepond'
import { environment } from 'src/environments/environment'
import { tokenGetter } from 'src/app/app.module'

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrls: ['./upload-files.component.scss'],
})
export class UploadFilesComponent implements OnInit {
    @ViewChild('pondInstatnce', { static: false }) pondInstatnce: any
    @Output() onFileUpload: EventEmitter<FileImage[]> = new EventEmitter<
        FileImage[]
    >()
    @Output() onFileRemove = new EventEmitter()

    pondOptions: FilePondOptionProps = {}

    @Input() multiple: boolean
    @Input() isCircle: boolean
    @Input() files: any[] = []

    constructor(public dialog: MatDialog) {}

    ngOnInit() {
        this.files = this.files.map((f) => ({
            // the server file reference
            source: f,

            // set type to local to indicate an already uploaded file
            options: {
                type: 'local',
            },
        }))
        this.pondOptions = {
            allowMultiple: this.multiple,
            // acceptedFileTypes: ['image/*'],
            labelIdle: `Drag & Drop your file or <span class="filepond--label-action">Browse</span>`,
            server: {
                process: {
                    url: `${environment.baseUrl}file`,
                    headers: {
                        Authorization: `Bearer ${tokenGetter()}`,
                    },
                },
                load: {
                    url: `${environment.baseUrl}file/`,
                    headers: {
                        Authorization: `Bearer ${tokenGetter()}`,
                    },
                },
                fetch: {
                    url: `${environment.baseUrl}file/`,
                    headers: {
                        Authorization: `Bearer ${tokenGetter()}`,
                    },
                },
                revert: {
                    url: `${environment.baseUrl}file`,
                    headers: {
                        Authorization: `Bearer ${tokenGetter()}`,
                    },
                },
            },
            styleLoadIndicatorPosition: 'center bottom',
            styleProgressIndicatorPosition: 'right bottom',
            styleButtonRemoveItemPosition: 'left bottom',
            styleButtonProcessItemPosition: 'right bottom',
        }
        if (this.isCircle) {
            this.pondOptions.stylePanelLayout = 'circle'
        }
    }

    onUploadFile(res) {
        this.onFileUpload.emit(this.getFiles())
    }

    onRemoveFile(res) {
        this.onFileRemove.emit(this.getFiles())
    }

    getFiles(): FileImage[] {
        const files = this.pondInstatnce.getFiles()
        return (files || []).map(
            (file: FilePond): FileImage => {
                return {
                    title: file.filename,
                    imageFile: file.serverId,
                    size: file.fileSize,
                }
            }
        )
    }
}
