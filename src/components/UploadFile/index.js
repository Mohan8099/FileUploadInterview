import {Component} from 'react'
import './index.css'

class UploadFile extends Component {
  state = {
    textName: '',
    textContent: '',
  }

  handleFiles = e => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      this.setState({textName: file.name, textContent: reader.result})
    }
    reader.onerror = () => {
      console.log('File Error', reader.error)
    }
  }

  render() {
    const {textName, textContent} = this.state

    return (
      <div className="uploader">
        <p>Upload Files</p>
        <br />
        <input type="file" onChange={this.handleFiles} />
        <br />
        <p>{textName}</p>
        <br />
        <p>{textContent}</p>
        <br />
      </div>
    )
  }
}

export default UploadFile
