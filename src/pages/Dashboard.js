import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./dashboard.css";
import axios from "axios";
import FileCard from "../components/Filecard";
import { context } from "../App";

export default function Dashboard() {
  const [aut, , url] = useContext(context);
  const [onefile, setOneFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const dragclass = isDragging ? 'drop-zone dragged' : 'drop-zone';
  const displaystyle = progress ? '' : 'none'
  useEffect(() => {
    fetch(`${url}/api/files/list`, {
      headers: { "x-auth-token": aut.jwt_token, uuid: aut.uuid },
    })
      .then((data) => data.json())
      .then((files) => setFiles(files))
      .catch((err) => console.log(err.message));
  }, []);

  const handleFileChange = async (e) => {
    setOneFile(e);
  };

  const handleUploadClick = async () => {
    const formData = new FormData();
    Object.keys(onefile).forEach(key => {
      formData.append("myfile", onefile[key])
    })

    if (!onefile) {
      return;
    }

    await axios.post(`${url}/api/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-auth-token": aut.jwt_token, uuid: aut.uuid,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setProgress(progress);
      }
    })
      .then((files) => setFiles(files.data))
      .catch((err) => console.log(err.message));
    setProgress(0);
    setOneFile(null);
  };
  const handleDeleteClick = (filename) => {
    fetch(`${url}/api/files/delete/${filename}`, {
      method: "DELETE",
      headers: { "x-auth-token": aut.jwt_token, uuid: aut.uuid },
    })
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  };




  return (
    <div className="dashboard-container">
      <div className="upload-container">
        <div className={dragclass} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
          <div className="icon-container">
            <img
              src="https://send.creativeshi.com/file.svg"
              className="center"
              draggable="false"
              alt="file-icon"
            />
            <img
              src="https://send.creativeshi.com/file.svg"
              className="rigth"
              draggable="false"
              alt="file-icon"
            />
            <img
              src="https://send.creativeshi.com/file.svg"
              className="left"
              draggable="false"
              alt="file-icon"
            />
          </div>
          <p>Drop your file here or,</p>
          <FileUploader
            label="Drag & Drop here"
            classes="file-uploader"
            multiple={true}
            handleChange={handleFileChange}
            name="myfile"
            hoverTitle="Drop here"
            dropMessageStyle={{
              backgroundColor: "skyblue",
              opacity: "1",
              color: "#ffff",
              "font-weight": "bold",
            }}
          />
          <button
            className="upload-btn"
            type="submit"
            onClick={handleUploadClick}
          >
            Upload⬆️
          </button>
        </div>
        <div className="progress-container" style={{ "display": `${displaystyle}` }}>
          <div className="bg-progress" style={{ "width": `${progress}%` }}>Uploading.....</div>
        </div>
      </div>
      <div className="show-zone">
        {
          files.map((file) => <FileCard file={file} handleDeleteClick={handleDeleteClick} key={file.ETag} />)
        }
      </div>
    </div>
  );
}