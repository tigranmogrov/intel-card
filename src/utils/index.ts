import { doc, getDoc } from "firebase/firestore";
import { database } from "@/firebase/firebase";

export const isExistsDoc = async (
  uid,
  docName,
  name,
  title
): Promise<boolean> => {
  const docRef = await doc(database, uid, docName, name, title);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
};

export const toPercent = (a: number, b: number) => Math.round((a / b) * 100);
