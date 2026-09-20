from fastapi import APIRouter

from models.request_models import (
    RegisterRequest,
    LoginRequest
)

from models.response_models import (
    RegisterResponse,
    LoginResponse
)

from services.auth_service import (
    register_user,
    login_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=RegisterResponse
)
async def register(
    request: RegisterRequest
):
    return register_user(request)



@router.post(
    "/login",
    response_model=LoginResponse
)
async def login(
    request: LoginRequest
):

    return login_user(request)