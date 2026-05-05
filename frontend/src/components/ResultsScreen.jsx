function ResultsScreen({ chapters }) {
  const handleDownload = () => {
    const text = chapters.map(ch => `
CHAPTER: ${ch.chapter}

Argument Coherence: ${ch.argument_coherence?.score}
${ch.argument_coherence?.feedback}
Suggestions: ${ch.argument_coherence?.suggestions?.join(', ')}

Structure: ${ch.structural_compliance?.score}
${ch.structural_compliance?.feedback}

Summary: ${ch.overall_summary}

---
`).join('\n')

    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'thesis-feedback.txt'
    a.click()
  }

  const getBadgeClass = (score) => {
    if (!score) return ''
    const s = score.toLowerCase()
    if (s.includes('strong') || s === 'compliant') return 'strong'
    if (s.includes('needs') || s.includes('partially')) return 'needs-work'
    if (s.includes('weak') || s.includes('non')) return 'weak'
    return ''
  }

  return (
    <div className="results">
      <h2>Thesis Feedback</h2>
      <p className="results-meta">{chapters.length} chapters analyzed</p>
      <button className="btn btn-outline" onClick={handleDownload} style={{marginBottom: '32px'}}>
        Download Feedback
      </button>

      {chapters.map((chapter, index) => (
        <div key={index} className="chapter-card">
          <h3>{chapter.chapter}</h3>

          {chapter.error ? (
            <p className="feedback-text">Could not analyze this chapter.</p>
          ) : (
            <>
              <div className="score-row">
                <span className="score-label">Argument Coherence</span>
                <span className={`score-badge ${getBadgeClass(chapter.argument_coherence.score)}`}>
                  {chapter.argument_coherence.score}
                </span>
              </div>
              <p className="feedback-text">{chapter.argument_coherence.feedback}</p>

              <div className="score-row">
                <span className="score-label">Structure</span>
                <span className={`score-badge ${getBadgeClass(chapter.structural_compliance.score)}`}>
                  {chapter.structural_compliance.score}
                </span>
              </div>
              <p className="feedback-text">{chapter.structural_compliance.feedback}</p>

              <div className="summary-box">{chapter.overall_summary}</div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default ResultsScreen