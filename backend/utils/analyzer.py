from groq import Groq
import json
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_chapter(
    chapter_title: str,
    chapter_text: str,
    guidelines_text: str,
    university: str,
    department: str
) -> dict:

    prompt = f"""You are reviewing a university thesis chapter for a student at {university}, {department} department.

The department submission guidelines are:
---
{guidelines_text[:2000]}
---

Review this chapter:
CHAPTER: {chapter_title}

TEXT:
{chapter_text[:4000]}

Respond ONLY with valid JSON and nothing else, no markdown, no backticks:
{{
  "chapter": "{chapter_title}",
  "argument_coherence": {{
    "score": "Strong / Needs Work / Weak",
    "feedback": "2-3 sentences of specific feedback",
    "suggestions": ["suggestion 1", "suggestion 2"]
  }},
  "structural_compliance": {{
    "score": "Compliant / Partially Compliant / Non-Compliant",
    "feedback": "2-3 sentences comparing to the guidelines",
    "suggestions": ["suggestion 1"]
  }},
  "overall_summary": "One paragraph summary of strengths and areas to improve"
}}"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    response_text = response.choices[0].message.content.strip()

    if response_text.startswith("```"):
        response_text = response_text.split("```")[1]
        if response_text.startswith("json"):
            response_text = response_text[4:]

    return json.loads(response_text)