import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export const uploadFile = async (file, folder) => {
  try {
    const firebaseConfig = {
      apiKey: "AIzaSyDU73cFks2koiIbC2rQWli3JeW9HFT92F8",
      authDomain: "weloveschool-c9c4d.firebaseapp.com",
      projectId: "weloveschool-c9c4d",
      storageBucket: "weloveschool-c9c4d.appspot.com",
      messagingSenderId: "227721759570",
      appId: "1:227721759570:web:ebd13408144bdb9ba7c88b",
      measurementId: "G-KDBZFM21NP",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const storage = getStorage(app);

    const storageRef = ref(storage, `${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Wait for the upload to complete
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading file:", error);
          reject(error);
        },
        () => {
          resolve(uploadTask.snapshot);
        }
      );
    });

    // Get download URL
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
