from fastapi import APIRouter, UploadFile, File, Form
from routers.upload import extract_pdf_text
from utils.segmentation import segment_into_chapters
from utils.analyzer import analyze_chapter

router = APIRouter()

@router.post("/analyze")
async def analyze_thesis(
    thesis: UploadFile = File(...),
    guidelines: UploadFile = File(...),
    university: str = Form(...),
    department: str = Form(...)
):
    thesis_text = extract_pdf_text(await thesis.read())
    guidelines_text = extract_pdf_text(await guidelines.read())

    chapters = segment_into_chapters(thesis_text)

    results = []
    for title, text in chapters.items():
        try:
            feedback = analyze_chapter(
                title, text, guidelines_text, university, department
            )
            results.append(feedback)
        except Exception as e:
            results.append({
                "chapter": title,
                "error": str(e)
            })

    return {"chapters": results, "total_chapters": len(results)}