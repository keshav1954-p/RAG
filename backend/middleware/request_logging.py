import time
import uuid

from fastapi import Request


async def request_logging_middleware(
    request: Request,
    call_next
):
    request_id = str(uuid.uuid4())

    request.state.request_id = request_id

    start_time = time.perf_counter()

    response = await call_next(request)

    process_time = time.perf_counter() - start_time

    response.headers["X-Request-ID"] = request_id
    response.headers["X-Process-Time"] = f"{process_time:.4f}"

    print(
        f"{request.method} "
        f"{request.url.path} "
        f"[{response.status_code}] "
        f"{process_time:.4f}s "
        f"request_id={request_id}"
    )

    return response