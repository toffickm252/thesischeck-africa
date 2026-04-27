import { useState } from 'react'

function UploadScreen() {
  const [thesisFile, setThesisFile] = useState(null)
  const [guidelinesFile, setGuidelinesFile] = useState(null)
  const [university, setUniversity] = useState('')
  const [department, setDepartment] = useState('')

  return (
    <div>
      <h2>Upload Your Thesis</h2>

      <div>
        <label>Thesis PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setThesisFile(e.target.files[0])}
        />
      </div>

      <div>
        <label>Department Guidelines PDF</label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setGuidelinesFile(e.target.files[0])}
        />
      </div>

      <div>
        <label>University</label>
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          placeholder="e.g. University of Ghana"
        />
      </div>

      <div>
        <label>Department</label>
        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          placeholder="e.g. Computer Science"
        />
      </div>

      <button>Submit</button>
    </div>
  )
}

export default UploadScreen