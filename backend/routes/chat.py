from fastapi import APIRouter, Depends

from models.request_models import ChatRequest
from models.response_models import ChatResponse
from services.chat_service import process_chat

from dependencies.common import get_request_source

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    request_source: dict = Depends(get_request_source)
):
    return process_chat(request)