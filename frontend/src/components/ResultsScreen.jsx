function ResultsScreen({ chapters }) {
  return (
    <div>
      <h2>Thesis Feedback</h2>
      {chapters.map((chapter, index) => (
        <div key={index}>
          <h3>{chapter.chapter}</h3>

          <p>Argument Coherence: {chapter.argument_coherence.score}</p>
          <p>{chapter.argument_coherence.feedback}</p>

          <p>Structure: {chapter.structural_compliance.score}</p>
          <p>{chapter.structural_compliance.feedback}</p>

          <p>{chapter.overall_summary}</p>

          <hr />
        </div>
      ))}
    </div>
  )
}

export default ResultsScreen