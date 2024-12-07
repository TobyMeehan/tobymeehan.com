import { faFile, faFileAudio, faFileCode, faFileCsv, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileText, faFileVideo, faFileWord, faFileZipper } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export interface FileIconProps {
    file: DownloadFile
}

export default function FileIcon({ file }: FileIconProps) {
    if (file.contentType.startsWith("image")) {
        return <FontAwesomeIcon title="Image" icon={faFileImage} />
    }

    if (file.contentType.startsWith("video")) {
        return <FontAwesomeIcon title="Video" icon={faFileVideo} />
    }

    if (file.contentType.startsWith("audio")) {
        return <FontAwesomeIcon title="Audio" icon={faFileAudio} />
    }

    if (file.filename.endsWith(".zip") ||
        file.filename.endsWith(".rar") ||
        file.filename.endsWith(".7z") ||
        file.filename.endsWith(".tar") ||
        file.filename.endsWith(".tar.gz")) {
        return <FontAwesomeIcon title="Archive" icon={faFileZipper} />
    }

    if (file.filename.endsWith(".csv")) {
        return <FontAwesomeIcon title="CSV File" icon={faFileCsv} />
    }

    if (file.filename.endsWith(".pdf")) {
        return <FontAwesomeIcon title="PDF Document" icon={faFilePdf} />
    }

    if (file.filename.endsWith(".doc") ||
        file.filename.endsWith(".docx") ||
        file.filename.endsWith(".odt") ||
        file.filename.endsWith(".tex") ||
        file.filename.endsWith(".wpd")) {
        return <FontAwesomeIcon title="Document" icon={faFileWord} />
    }

    if (file.filename.endsWith(".xls") ||
        file.filename.endsWith(".xlsx") ||
        file.filename.endsWith(".xlsm") ||
        file.filename.endsWith(".ods")) {
        return <FontAwesomeIcon title="Spreadsheet" icon={faFileExcel} />
    }

    if (file.filename.endsWith(".ppt") ||
        file.filename.endsWith(".pptx") ||
        file.filename.endsWith(".pps") ||
        file.filename.endsWith(".odp")) {
        return <FontAwesomeIcon title="Slideshow" icon={faFilePowerpoint} />
    }

    if (file.filename.endsWith(".c") ||
        file.filename.endsWith(".cpp") ||
        file.filename.endsWith(".cs") ||
        file.filename.endsWith(".pl") ||
        file.filename.endsWith(".sh") ||
        file.filename.endsWith(".swift") ||
        file.filename.endsWith(".vb") ||
        file.filename.endsWith(".vbs") ||
        file.filename.endsWith(".bat") ||
        file.filename.endsWith(".sln") ||
        file.filename.endsWith(".asp") ||
        file.filename.endsWith(".aspx") ||
        file.filename.endsWith(".htm") ||
        file.filename.endsWith(".html") ||
        file.filename.endsWith(".xhtml") ||
        file.filename.endsWith(".java") ||
        file.filename.endsWith(".js") ||
        file.filename.endsWith(".jsp") ||
        file.filename.endsWith(".jsx") ||
        file.filename.endsWith(".json") ||
        file.filename.endsWith(".mjs") ||
        file.filename.endsWith(".ts") ||
        file.filename.endsWith(".tsx") ||
        file.filename.endsWith(".php") ||
        file.filename.endsWith(".py") ||
        file.filename.endsWith(".nlogo")) {
        return <FontAwesomeIcon title="Code" icon={faFileCode} />
    }

    if (file.contentType.startsWith("text")) {
        return <FontAwesomeIcon title="Text" icon={faFileText} />
    }

    return <FontAwesomeIcon title="Unknown Type" icon={faFile} />
}
