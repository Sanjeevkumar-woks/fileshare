import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { context } from "../../App";
import './fileshared.css'

function Fileshared() {
    const [aut, , url] = useContext(context);
    const { filename, size } = useParams();
    const [shareLink, setShareLink] = useState('');
    const [emailTo, setEmailTo] = useState('');


    useEffect(() => {
        fetch(`${url}/api/files/share/${filename}`, {
            headers: { "x-auth-token": aut.jwt_token, uuid: aut.uuid },
        })
            .then((data) => data.json())
            .then((link) => setShareLink(link.sharedlink))
            .catch((err) => console.log(err.message));

    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(shareLink)
    }


    const handleSendEmail = () => {
        if(!emailTo){
           return (alert("Enter emailid of recipent"))
        }
        const sharedfile = {
            "sharedlink": shareLink,
            emailTo,
            "emailFrom": aut.email,
        }
        fetch(`${url}/api/files/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sharedfile),
        })
            .then((res) => res.json())
            .then((data) => alert(data.msg))
            .catch((err) => console.error(err));
    }


    return (
        <div className='fileshare-container'>
            <div className='fileshare-card'>
                <h2 className="file-name">{filename}</h2>
                <p>Size: {Number(size) / 1000}kb</p>
            </div>
            <div className='fileshare-email-container'>
                <h2>Share your File</h2>
                <h4>Share by Link</h4>
                <input defaultValue={shareLink} />
                <br />
                <button className="Btn share-btn" onClick={handleCopy}>
                    <svg viewBox="0 0 512 512" className="sign" height="1em"><path d="M288 448H64V224h64V160H64c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64zm-64-96H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64z"></path></svg>
                    <p className="text">COPY</p>
                    <span className="effect"></span>
                </button>
                <span className='note'>Link expires in 24Hrs</span>
                <h4>Share by email</h4>
                <input type='email' onChange={(e) => setEmailTo(e.target.value)} required />
                <br />
                <button className='send-btn' onClick={handleSendEmail}>
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" fill="currentColor"></path>
                            </svg>
                        </div>
                    </div>
                    <span>Send</span>
                </button>
            </div>
        </div>
    )
}

export default Fileshared