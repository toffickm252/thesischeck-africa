function LandingPage({ onStart }) {
  return (
    <div>
      <h1>Get feedback on your thesis before it is evaluated by your supervisor</h1>
      <p>Upload your thesis and department guidelines. Get chapter-by-chapter feedback on your arguments and structure.</p>
      <button onClick={onStart}>Check My Thesis</button>
    </div>
  )
}

export default LandingPage