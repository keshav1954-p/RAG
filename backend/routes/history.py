from fastapi import APIRouter
from services.history_service import get_chat_history
from exceptions.custom_exceptions import ResourceNotFoundException

router = APIRouter(
    prefix="/history",
    tags=["Chat History"]
)


@router.get("/")
async def get_history():
    
    return get_chat_history()