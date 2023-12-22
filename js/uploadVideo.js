import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBaUM3TBVZuNqzFpem3LWXszTV5DlBa9PI",
	authDomain: "bioenergy-a73ad.firebaseapp.com",
	projectId: "bioenergy-a73ad",
	storageBucket: "bioenergy-a73ad.appspot.com",
	messagingSenderId: "256624312778",
	appId: "1:256624312778:web:dfa69981321c0c4b2d0f33",
	measurementId: "G-28TJ6GH1J0"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);


import {
    doc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

const homepageDocRef = doc(firestore, "totfd", "Homepage");



// import {
//  ref,
//  uploadBytesResumable,
// } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";
//import { storage } from "../js/firebase-config.js";

var videoInput1 = document.getElementById('videoInput1');
var videoInput2 = document.getElementById('videoInput2');
var videoPlayer1 = document.getElementById('videoPlayer1');
var videoPlayer2 = document.getElementById('videoPlayer2');

var playButton1 = document.getElementById('playButton1');
var playButton2 = document.getElementById('playButton2');

uploadButton.addEventListener("click", async function () {
    var file1 = videoInput1.files[0];
    var file2 = videoInput2.files[0];

    if (file1 && file2) {
        var storageRef1 = ref(storage, "totfd/videos/" + file1.name);
        var storageRef2 = ref(storage, "totfd/videos/" + file2.name);

        // Upload the first video
        var uploadTask1 = uploadBytesResumable(storageRef1, file1);

        uploadTask1.on(
            "state_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                message.innerText = "Upload in progress ";
            },
            function error(err) {
                message.innerText = "Upload failed: " + err.message;
            },
            function complete() {
                message.innerText = "Upload successful!";
            }
        );

        // Upload the second video
        var uploadTask2 = uploadBytesResumable(storageRef2, file2);

        uploadTask2.on(
            "state_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // You can update the message or handle progress for the second video separately
            },
            function error(err) {
                message.innerText = "Upload failed: " + err.message;
            },
            function complete() {
                // You can update the message or handle completion for the second video separately
            }
        );

        // Wait for both uploads to complete
        await Promise.all([uploadTask1, uploadTask2]);

        // Get download URLs
        const url1 = await getDownloadURL(storageRef1);
        const url2 = await getDownloadURL(storageRef2);

        // Update Firestore documents
        try {
            await updateDoc(homepageDocRef, {
                videoUrl1: url1,
                videoUrl2: url2,
            });

            alert("Data added successfully");
        } catch (error) {
            alert("Unsuccessful operation, error: " + error);
        }

        // Display the videos
        displayVideo(url1, videoPlayer1);
        displayVideo(url2, videoPlayer2);
    } else {
        message.innerText = "Please select two files to upload.";
    }
});

// playButton1.addEventListener('click', function () {
//     // Play the first video when the "Play Video 1" button is clicked
//     videoPlayer1.play();
// });

// playButton2.addEventListener('click', function () {
//     // Play the second video when the "Play Video 2" button is clicked
//     videoPlayer2.play();
// });


// Update the displayVideo function to accept the video player as a parameter
function displayVideo(url, videoPlayer) {
    videoPlayer.src = url;
    videoPlayer.load();
   
    
}