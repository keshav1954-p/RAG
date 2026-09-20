from models.request_models import ChatRequest


def process_chat(request: ChatRequest):
    return {
        "message": "Chat request received",
        "question": request.question
    }