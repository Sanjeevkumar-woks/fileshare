import React, { useEffect } from "react";
import { useState } from "react";
import uploadimg from "./images.png";
import "./dashboard.css";

const url = "http://localhost:9000";

export default function Dashboard({ aut }) {
  const [file, setFile] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${url}/api/files/allfiles`)
      .then((data) => data.json())
      .then((files) => setFiles(files))
      .catch((err) => console.log(err.message));
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    const formData = new FormData();
    formData.append("myfile", file);

    if (!file) {
      return;
    }

    fetch(`${url}/api/files`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  };
  const handleDeleteClick = (uuid) => {
    fetch(`${url}/api/files/${uuid}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="dashboard-container">
      <div className="upload-container">
        <div className="drop-zone">
          <img className="upload-icon" src={uploadimg} alt="upload-icon" />
          <p>Drop your file here or,</p>
          <div className="file-upload-form">
            <label>Select a file:</label>
            <br />
            <input
              type="file"
              id="myfile"
              name="myfile"
              onChange={handleFileChange}
            />
            <br />
            <button
              className="upload-btn"
              type="submit"
              onClick={handleUploadClick}
            >
              Upload⬆️
            </button>
          </div>
        </div>
      </div>
      <div className="show-zone">
        {files.map((file) => (
          <FileCard
            file={file}
            key={file.uuid}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}

function FileCard({ file, handleDeleteClick }) {
  const { filename, size, uuid } = file;

  return (
    <div className="file-card">
      <div className="delete-btn-container">
        <button className="delete-btn" onClick={() => handleDeleteClick(uuid)}>
          ❌
        </button>
      </div>
      <h6>{filename}</h6>
      <p>Size: {size / 1000}kb</p>
      <a href={`${url}/files/download/${uuid}`} target="__blank">
        <button className="download-btn">Download file ⬇️</button>
      </a>
    </div>
  );
}
