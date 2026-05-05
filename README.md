# ThesisCheck Africa

An AI-powered thesis review tool for final-year students at African universities.

**Live app:** https://thesischeck-africa.vercel.app  
**GitHub:** https://github.com/toffickm252/thesischeck-africa

## The Problem

When you're days from submitting your thesis, your university runs a similarity check. That's the only automated feedback you get. Nobody tells you if your arguments hold up or if your structure meets your department's requirements. Your supervisor doesn't have time. You submit and hope.

## What It Does

Upload your thesis PDF and your department's submission guidelines. Get chapter-by-chapter feedback on:

- Argument coherence — does each chapter's argument hold together?
- Structural compliance — does your structure match your department's requirements?

Powered by Groq (Llama 3.3 70B).

## Tech Stack

- **Frontend:** React (Vite), deployed on Vercel
- **Backend:** FastAPI (Python), deployed on Render
- **AI:** Groq API — Llama 3.3 70B
- **PDF extraction:** pdfplumber

## Running Locally

**Backend:**

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env`:

```
GROQ_API_KEY=your_key_here
```

```bash
uvicorn main:app --reload
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env`:

VITE_API_URL=http://localhost:8000

## Known Limitations

- Scanned/image-based PDFs return empty text — text-based PDFs only
- Chapter segmentation relies on heading patterns — unusual formats may not detect correctly
- Render free tier spins down after inactivity — first request takes 30-60 seconds
- Full thesis analysis takes 30-60 seconds

## Built As Part Of

ENg 30-Day Build in Public Challenge — Days 17–30  
[@elzer252](https://x.com/elzer252) | #ENg30DayChallenge | #ENgShipIt

## Author

Mohammed Toffick — [@elzer252](https://x.com/elzer252)  
GitHub: [github.com/toffickm252](https://github.com/toffickm252)
