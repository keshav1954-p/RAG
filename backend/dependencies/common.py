from fastapi import Header


def get_request_source(
    user_agent: str | None = Header(default=None)
):
    return {
        "user_agent": user_agent
    }