import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, doc, getDoc, collection, setDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
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

export async function UploadPhoto(file) {
  const storage = getStorage();
  const storageRef = ref(storage, file.name);
  await uploadBytes(storageRef, file);
  const photos = (await GetPhotos()).data();
  if (!photos.Photos.includes(file.name)) {
    photos.Photos.push(file.name);
    await SetPhotos(photos);
    return true;
  } else {
    return false;
  }
}

export async function DeletePhoto(filename) {
  const storage = getStorage();
  const storageRef = ref(storage, filename);
  await deleteObject(storageRef);
  const photos = (await GetPhotos()).data();
  const index = photos.Photos.indexOf(filename);
  if (index > -1) {
    photos.Photos.splice(index, 1);
    SetPhotos(photos);
  }
}
