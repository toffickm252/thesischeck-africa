from fastapi import APIRouter, UploadFile, File, Form
import pdfplumber
import tempfile
import os

from utils.segmentation import segment_into_chapters

router = APIRouter()

def extract_pdf_text(file_bytes: bytes) -> str:
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    text = ""
    with pdfplumber.open(tmp_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    os.unlink(tmp_path)
    return text

@router.post("/upload")
async def upload_thesis(
    thesis: UploadFile = File(...),
    guidelines: UploadFile = File(...),
    university: str = Form(...),
    department: str = Form(...)
):
    thesis_text = extract_pdf_text(await thesis.read())
    guidelines_text = extract_pdf_text(await guidelines.read())

    chapters = segment_into_chapters(thesis_text)

    return {
        "chapters": chapters,
        "chapter_count": len(chapters),
        "guidelines_text": guidelines_text,
        "university": university,
        "department": department
    }