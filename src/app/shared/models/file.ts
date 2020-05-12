export class FilePond {
    file?: File
    fileExtension?: string
    fileSize?: number
    fileType?: string
    filename?: string
    filenameWithoutExtension?: string
    id?: string
    origin?: number
    released?: boolean
    serverId?: string
    source?: File
    status?: FileStatus
}

export class FileImage {
    constructor() {
        this.saved = false
    }
    sectionId?: string
    title?: string
    imageFile?: string
    description?: string
    order?: number
    link?: string
    date?: string
    tag?: string
    size?: number
    saved?: boolean
}
export class FileImageFields {
    sectionId?: boolean
    title?: boolean
    imageFile?: boolean
    description?: boolean
    order?: boolean
    link?: boolean
    date?: boolean
    tag?: boolean
}

export enum FileStatus {
    INIT = 1,
    IDLE = 2,
    PROCESSING_QUEUED = 9,
    PROCESSING = 3,
    PROCESSING_COMPLETE = 5,
    PROCESSING_ERROR = 6,
    PROCESSING_REVERT_ERROR = 10,
    LOADING = 7,
    LOAD_ERROR = 8,
}
