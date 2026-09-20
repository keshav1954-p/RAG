from fastapi import UploadFile


async def process_upload(file: UploadFile):
    return {
        "message": "File received",
        "filename": file.filename,
        "content_type": file.content_type
    }