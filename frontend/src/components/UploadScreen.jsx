import { useState } from 'react'

function UploadScreen() {
  const [thesisFile, setThesisFile] = useState(null)
  const [guidelinesFile, setGuidelinesFile] = useState(null)
  const [university, setUniversity] = useState('')
  const [department, setDepartment] = useState('')
  const [isUploading, setIsUploading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!thesisFile || !guidelinesFile) {
      alert('Please select both PDF files.')
      return
    }

    const formData = new FormData()
    formData.append('thesis', thesisFile)
    formData.append('guidelines', guidelinesFile)
    formData.append('university', university)
    formData.append('department', department)

    setIsUploading(true)
    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Upload failed')
      }

      const data = await response.json()
      console.log('Extraction result:', data)
      alert('Text extracted! Check browser console.')
    } catch (error) {
      console.error('Upload error:', error)
      alert(`Upload failed: ${error.message}`)
    } finally {
      setIsUploading(false)
    }
  }

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

      <button onClick={handleSubmit} disabled={isUploading}>
        {isUploading ? 'Extracting text...' : 'Submit'}
      </button>
    </div>
  )
}

export default UploadScreen