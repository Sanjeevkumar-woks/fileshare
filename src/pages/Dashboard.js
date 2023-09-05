import React, { useEffect } from "react";
import { useState } from "react";
import uploadimg from "./images.png";
import { FileUploader } from "react-drag-drop-files";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FcShare } from "react-icons/fc";

import "./dashboard.css";
import axios from "axios";

const url = "https://fileshare-backend-s3-i6kbkflgp-sanjeevkumar-woks.vercel.app";

export default function Dashboard({ aut }) {
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
        const progress = (progressEvent.loaded / progressEvent.total) * 50;
        setProgress(progress);
      },

    })
      .then((files) => setFiles(files.data))
      .catch((err) => console.log(err.message));

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
          <p className="uploaded-file-name">
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
        <button className="buttonShare"><FcShare /></button>
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
