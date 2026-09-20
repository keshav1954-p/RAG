from models.request_models import RegisterRequest, LoginRequest


def register_user(request: RegisterRequest):
    return {
        "message": "Registration request received",
        "email": request.email
    }


def login_user(request: LoginRequest):
    return {
        "message": "Login request received",
        "email": request.email
    }