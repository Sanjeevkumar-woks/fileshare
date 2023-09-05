import { MdOutlineDeleteForever } from "react-icons/md";
import { FcShare } from "react-icons/fc";
import './filecard.css'
import { useContext } from "react";
import { context } from "../App";


export default function FileCard({ file, handleDeleteClick}) {
    const [aut,,url] = useContext(context);
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
