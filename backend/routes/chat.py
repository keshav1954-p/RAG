from fastapi import APIRouter

from models.request_models import ChatRequest
from models.response_models import ChatResponse

from services.chat_service import process_chat


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post(
    "/",
    response_model=ChatResponse
)
async def chat(
    request: ChatRequest
):

    return process_chat(request)