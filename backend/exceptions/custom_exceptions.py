from exceptions.error_code import ErrorCode


class AppException(Exception):

    def __init__(
        self,
        message: str,
        error_code: ErrorCode,
        status_code: int = 400
    ):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code

        super().__init__(message)

class ResourceNotFoundException(AppException):

    def __init__(self, message: str = "Resource not found"):
        super().__init__(
            message=message,
            error_code=ErrorCode.NOT_FOUND,
            status_code=404
        )


class UnauthorizedException(AppException):

    def __init__(self, message: str = "Unauthorized"):
        super().__init__(
            message=message,
            error_code=ErrorCode.UNAUTHORIZED,
            status_code=401
        )
        