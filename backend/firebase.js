const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbCcKAk7N-BtJfKzCjzDxrAdsLAqPoq9s",
  authDomain: "newsblogs-d0bc6.firebaseapp.com",
  projectId: "newsblogs-d0bc6",
  storageBucket: "newsblogs-d0bc6.appspot.com",
  messagingSenderId: "379004232370",
  appId: "1:379004232370:web:541fc9f7206af958e19fab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload a file and get the download URL
const uploadFileToFirebase = async (file, path) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw new Error("File upload failed");
  }
};

module.exports = { uploadFileToFirebase };
