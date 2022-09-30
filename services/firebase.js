import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { IProjectContainer } from "~/data/Project";
import firebaseConfig from '../firebaseconfig'

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

export async function GetAdmins() {
  return await getDoc(doc(db, 'Auth', 'users'));
}

export async function GetProjects() {
  return await getDoc(doc(db,'ProjectPage', 'Projects'));
}

export async function SetProjects(data) {
  return await setDoc(doc(db, 'ProjectPage', 'Projects'), data);
}

export async function GetContent() {
  const content = await getDoc(doc(db,'ProjectPage', 'ExitSlider'));
  return content.data().Content;
}

export async function GetPhotos() {
  return await getDoc(doc(db,'ProjectPage', 'PhotoPage')); 
}

export async function SetPhotos(data) {
  return await setDoc(doc(db, 'ProjectPage', 'PhotoPage'), data);
}

export async function GetFileUrl(filename) {
  return await getDownloadURL(ref(storage, filename));
}

export async function GetPhotoUrls(filenames) {
  const photoUrls = [];
  for (const photo of filenames) {
    photoUrls.push(await GetFileUrl(photo));
  }
  return photoUrls;
}
