from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.settings import settings


from routes.auth import router as auth_router
from routes.upload import router as upload_router
from routes.chat import router as chat_router
from routes.history import router as history_router


app = FastAPI(
      title=settings.app_name,
      version=settings.app_version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)
app.include_router(history_router)