import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

export const registerUser = async (userData) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
    const user = userCredential.user;
    
    // Save user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      specialty: userData.specialty,
      createdAt: new Date().toISOString()
    });
    
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserData = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    }
    return { success: false, error: 'Usuario no encontrado' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateUserData = async (uid, userData) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, userData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
