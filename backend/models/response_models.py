from pydantic import BaseModel


class MessageResponse(BaseModel):
    message: str


class RegisterResponse(BaseModel):
    message: str
    email: str


class LoginResponse(BaseModel):
    message: str
    email: str


class ChatResponse(BaseModel):
    message: str
    question: str


class UploadResponse(BaseModel):
    message: str
    filename: str
    content_type: str