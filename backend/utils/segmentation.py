import re

def segment_into_chapters(text: str) -> dict:
    chapter_pattern = re.compile(
        r'(CHAPTER\s+[\dIVXivx]+|Chapter\s+[\dIVXivx]+|\d+\.\s+[A-Z][A-Z\s]{3,})',
        re.MULTILINE
    )
    
    matches = list(chapter_pattern.finditer(text))
    
    if not matches:
        return {"Full Document": text}
    
    chapters = {}
    for i, match in enumerate(matches):
        start = match.start()
        end = matches[i+1].start() if i+1 < len(matches) else len(text)
        title = match.group().strip()
        chapters[title] = text[start:end].strip()
    
    return chapters