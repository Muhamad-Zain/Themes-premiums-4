// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, listAll, ref as storageRef, uploadBytes  } from 'firebase/storage'
import { getDatabase, child, get, ref, set, push } from 'firebase/database'
// import { collection, doc, getDocs, getFirestore } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// import { signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: "wedings-one",
    storageBucket: "wedings-one.firebasestorage.app",
    messagingSenderId: "49992893490",
    appId: "1:49992893490:web:4077263dec14a3dead682b",
    measurementId: "G-D3NM4LXBKD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const storage = getStorage(app)
const auth = getAuth(app)

// fetch Data firebase

const fetchData = async (id) => {
    
    try {
        const dbRef = ref(database);
        const data = await get(child(dbRef, `/weddings-four/${id}`))
        if (data.exists()) {
            return data.val()
        } else {
            console.log('no data evaible');
            return null
        }
    } catch (error) {
        console.log('error fecth data', error);
        return null
    }
}

// fetch Background Image 
const fetchBg = async (id) => {
    try {
        const galleryRef = storageRef(storage, `${id}`); // Referensi ke folder '01/galery'
        
        const images = [];
        const listResult = await listAll(galleryRef); // Mendapatkan semua item dalam folder

        for (const item of listResult.items) {
            const url = await getDownloadURL(item); // Mendapatkan URL dari setiap item
            images.push(url); // Menyimpan URL ke array
        }

        return images;
    } catch (error) {
        console.log("Gagal mendapatkan gambar:", error);
        return [];
    }
    // const imqColect =  collection(db, `${id}`)

    // try {
    //     const snapshot  = await getDocs
    // } catch (error) {
        
    // }
}

// Fetch Image Galery from Firebase
const fetchGalery = async (id) => {
    try {
        const galleryRef = storageRef(storage, `${id}/galery`); // Referensi ke folder '01/galery'
        
        const images = [];
        const listResult = await listAll(galleryRef); // Mendapatkan semua item dalam folder

        for (const item of listResult.items) {
            const url = await getDownloadURL(item); // Mendapatkan URL dari setiap item
            images.push(url); // Menyimpan URL ke array
        }

        return images;
    } catch (error) {
        console.log("Gagal mendapatkan gambar:", error);
        return [];
    }
}


// Send Data String to Firebase
const addDataToFirebase = async (id, formData) => {
    // const id = formData.id || Date.now().toString();
    // const id =  Date.now().toString();

    try {
      await set(ref(database, `/weddings-four/${id}`), formData);
      console.log("Data successfully added!");
    } catch (error) {
      console.error("Error adding data:", error);
    }
    
  };
  
  const uploadFileToFirebase = async (file, category, id) => {
    if (!file || !file.name) {
        console.error(`Error: File or file name is undefined for category ${category}`);
        return;
      }
      console.log(`Uploading file: ${file.name} to category: ${category}`); // Log tambahan

    try {
      // Membuat referensi file di Firebase Storage
      const fileRef = storageRef(storage, `${id}/${category}/${file.name}`);
  
      // Meng-upload file ke Firebase Storage
      await uploadBytes(fileRef, file);
  
      return { category};
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error("File upload failed.");
    }
  };
  
  // Fungsi untuk meng-upload beberapa file sekaligus
  export const uploadFiles = async (id, files, categories) => {
    try {
    //   const newId = uuidv4();  // Membuat ID unik untuk setiap upload
  
      const uploadedFiles = [];
      for (const category of categories) {
        if (files[category]) {
          const file = files[category];
          if (Array.isArray(file)) {
            const validFiles = file.filter(item => item && item.name); 
            for (const file of validFiles) {
              if (file && file.name) { // Validasi file
                const uploadedFile = await uploadFileToFirebase(file, category, id);
                uploadedFiles.push(uploadedFile);
              }
            }
          } else if (file && file.name) { // Validasi file tunggal
            const uploadedFile = await uploadFileToFirebase(file, category, id);
            uploadedFiles.push(uploadedFile);
          }
        }
      }
  
      // Mengembalikan hasil upload file
      return uploadedFiles;
    } catch (error) {
      console.error("Error uploading files:", error);
      throw new Error("File upload failed.");
    }
  };
  const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User logged in:", user);
      // setVerify(true)
      return true
  
    } catch (error) {
      console.error("Error during login:", error.message);
     
    }
  };

export { storage, database, fetchGalery, fetchBg, fetchData, addDataToFirebase, loginUser}