import { Input } from '@mui/material'
import Button from '@restart/ui/esm/Button'
import React from 'react'
import { db } from './firebase';
import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, Timestamp } from '@firebase/firestore';
import { FirebaseError } from '@firebase/util';
import { getDatabase, set } from "firebase/database";

const storage = getStorage();

function ImageUpload({username}) {

    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('');

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const storageRef = ref(storage, image.name);

        const uploadTask = uploadBytesResumable(storageRef, image);

        console.log(username);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                addDoc(collection(db, "Post_details"), {
                    imageUrl: downloadURL,
                    caption: caption,
                    username: username
                });
            });
        });
        
     };

    return (
        <div>
            <progress value={progress} max="100" />
            <Input type="text" placeholder=" Caption..." onChange={event => setCaption(event.target.value)} value = {caption}/>
            <Input type = "file" placeholder ="Upload Image" onChange={handleChange}/>
            <Button type="submit" onClick ={handleUpload}>Upload</Button>
        </div>
    )
}

export default ImageUpload
