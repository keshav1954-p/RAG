from fastapi import APIRouter, UploadFile, File

from models.response_models import UploadResponse

from services.upload_service import process_upload

router = APIRouter(
    prefix="/upload",
    tags=["Document Upload"]
)


@router.post(
    "/",
    response_model=UploadResponse
)
async def upload_document(
    file: UploadFile = File(...)
):

    return  await process_upload(file)