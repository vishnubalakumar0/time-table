import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";

export const firestoreSync = {
  // Add to any collection & auto return document with id
  async add(col, data) {
    const ref = await addDoc(collection(db, col), data);
    return { id: ref.id, ...data };
  },

  // Fetch whole collection
  async fetch(col) {
    const snap = await getDocs(collection(db, col));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  // Save class timetable
  async saveClassTimetable(className, data) {
    await setDoc(doc(db, "timetable/class", className), data);
  },

  // Save staff timetable
  async saveStaffTimetable(staffName, data) {
    await setDoc(doc(db, "timetable/staff", staffName), data);
  }
};