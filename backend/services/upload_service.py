from pathlib import Path

from fastapi import UploadFile

from config.settings import settings
from exceptions.custom_exceptions import AppException
from exceptions.error_code import ErrorCode


ALLOWED_FILE_TYPES = {
    "application/pdf"
}


async def process_upload(file: UploadFile):

    if file.content_type not in ALLOWED_FILE_TYPES:
        raise AppException(
            message="Only PDF files are allowed",
            error_code=ErrorCode.INVALID_REQUEST,
            status_code=400
        )

    upload_dir = Path(settings.upload_dir)

    upload_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    safe_filename = Path(file.filename).name
    file_path = upload_dir / safe_filename

    contents = await file.read()

    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    return {
        "message": "File uploaded successfully",
        "filename": file.filename,
        "content_type": file.content_type
    }