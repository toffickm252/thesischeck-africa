function LandingPage({ onStart }) {
  return (
    <div className="landing">
      <h1>Get feedback on your thesis before your supervisor does</h1>
      <p>Upload your thesis and department guidelines. Get chapter-by-chapter feedback on argument coherence and structural compliance.</p>
      <button className="btn btn-primary" onClick={onStart}>Check My Thesis</button>
    </div>
  )
}

export default LandingPage