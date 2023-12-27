
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');
const XLSX = require('xlsx');

const firebaseConfig = {
  apiKey: "AIzaSyCGqwP_0Wo9VlbJfzbEVUPuYoHAkjK4AU",
  authDomain: "fpmi-intermediary.firebaseapp.com",
  projectId: "fpmi-intermediary",
  storageBucket: "fpmi-intermediary.appspot.com",
  messagingSenderId: "201216745483",
  appId: "1:201216745483:web:42b4ff71a8001065f7270e",
  measurementId: "G-648MRCSYVD"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


function uploadExcelToFirebase(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; 
  const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[Simple]);

  jsonData.forEach((data, index) => {
    set(ref(database, 'students/' + index), data)
      .then(() => console.log(`Data uploaded for student ${index}`))
      .catch((error) => console.error(`Failed to upload data for student ${index}:`, error));
  });
}
uploadExcelToFirebase('C:\Users\User\Desktop\RawStudentData.xlsx');
