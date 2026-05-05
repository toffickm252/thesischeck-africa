from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload
from routers import analyze

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://thesischeck-africa.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)
app.include_router(analyze.router)

@app.get("/health")
def health():
    return {"status": "ok", "message": "ThesisCheck Africa API running"}