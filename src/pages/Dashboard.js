import React, { useEffect } from "react";
import { useState } from "react";
import uploadimg from "./images.png";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineDeleteForever } from "react-icons/md";
import "./dashboard.css";

const url = "http://localhost:4000";

export default function Dashboard({ aut }) {
  const [onefile, setOneFile] = useState(null);
  const [files, setFiles] = useState([]);

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

  const handleUploadClick = () => {
    const formData = new FormData();
    Object.keys(onefile).forEach(key => {
      formData.append("myfile", onefile[key])
    })

    if (!onefile) {
      return;
    }
    fetch(`${url}/api/files/upload`, {
      method: "POST",
      body: formData,
      headers: { "x-auth-token": aut.jwt_token, uuid: aut.uuid },
    })
      .then((res) => res.json())
      .then((data) => setFiles(data))
      .catch((err) => console.error(err));
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
        <div className="drop-zone">
          <img className="upload-icon" src={uploadimg} alt="upload-icon" />
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
          <p className="uploaded-file-name">
            {onefile ? <p>hi</p> : "no files uploaded yet"}
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
        {
          files.map((file) => <FileCard file={file} handleDeleteClick={handleDeleteClick} aut={aut} key={file.ETag} />)
        }
      </div>
    </div>
  );
}

function FileCard({ file, handleDeleteClick, aut }) {
  const { Key, Size } = file;
  function downloadDocument(filename) {
    fetch(`${url}/api/files/download/${filename}`, {
      headers: { "x-auth-token": aut.jwt_token, uuid: aut.uuid }
    }).then((res) => res.json()).then((data) => window.open(data.signed_url, "_blank")).catch((err) => console.log(err))
  }

  const filename = Key.split('/')[1];
  return (
    <div className="file-card">
      <div className="delete-btn-container">
        <button className="delete-btn" onClick={() => handleDeleteClick(filename)}>
          <MdOutlineDeleteForever />
        </button>
      </div>
      <h6 className="file-name">{filename}</h6>
      <p>Size: {Size / 1000}kb</p>
      <div className="layer">
        <button onClick={() => downloadDocument(filename)} className="buttonDownload">Download </button>
      </div>
    </div>
  );
}
