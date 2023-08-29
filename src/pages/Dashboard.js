import React, { useEffect } from "react";
import { useState } from "react";
import uploadimg from "./images.png";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./dashboard.css";

const url = "http://localhost:9000";

export default function Dashboard({ aut }) {
  const [onefile, setOneFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`${url}/api/files/allfiles`, {
      headers: { "x-auth-token": aut.jwt_token, email: aut.email },
    })
      .then((data) => data.json())
      .then((files) => setFiles(files))
      .catch((err) => console.log(err.message));
  }, []);

  const handleFileChange = (e) => {
    setOneFile(e);
    console.log(e);
  };

  const handleUploadClick = () => {
    const formData = new FormData();
    formData.append("myfile", onefile);
    if (!onefile) {
      return;
    }
    fetch(`${url}/api/files`, {
      method: "POST",
      body: formData,
      headers: { "x-auth-token": aut.jwt_token, email: aut.email },
    })
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
    setOneFile(null);
  };
  const handleDeleteClick = (uuid) => {
    fetch(`${url}/api/files/${uuid}`, {
      method: "DELETE",
      headers: { "x-auth-token": aut.jwt_token, email: aut.email },
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
          <FileUploader
            label="Drag & Drop here"
            classes="file-uploader"
            multiple={false}
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
          <p className="uploaded-file-name">
            {onefile ? `File name: ${onefile.name}` : "no files uploaded yet"}
          </p>
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
          <MdOutlineDeleteForever />
        </button>
      </div>
      <h6 className="file-name">{filename}</h6>
      <p>Size: {size / 1000}kb</p>
      <div class="layer">
        <a href={`${url}/files/download/${uuid}`} class="buttonDownload">
          Download
        </a>
      </div>
    </div>
  );
}
