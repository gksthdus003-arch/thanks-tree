import { db } from '../firebaseConfig';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { Note } from '../types';

const COLLECTION_NAME = 'notes';
const LOCAL_STORAGE_KEY = 'thanks_tree_notes_backup';

// 실시간으로 노트 변경사항을 구독하는 함수
export const subscribeToNotes = (onUpdate: (notes: Note[]) => void) => {
  if (!db) {
    console.warn("Firestore is not initialized. Falling back to LocalStorage for demo purposes.");
    // Fallback to LocalStorage so the user can see *something* in preview
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        onUpdate(JSON.parse(saved));
      } catch (e) {
        onUpdate([]);
      }
    } else {
      onUpdate([]);
    }
    return () => {};
  }

  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Note));
      onUpdate(notes);
    }, (error) => {
      console.error("데이터 불러오기 실패 (Firebase 권한 또는 설정 오류):", error);
    });

    return unsubscribe;
  } catch (error) {
    console.error("Firebase 연결 오류:", error);
    return () => {};
  }
};

export const saveNote = async (note: Omit<Note, 'id'>): Promise<string> => {
  if (!db) {
    // Fallback save to LocalStorage
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    const notes = saved ? JSON.parse(saved) : [];
    const newId = Date.now().toString();
    const newNote = { ...note, id: newId };
    notes.push(newNote);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
    
    // Alert removed to allow immediate UI update in App.tsx without nagging user
    return newId;
  }

  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), note);
    return docRef.id;
  } catch (error) {
    console.error("저장 실패:", error);
    alert("쪽지 저장에 실패했습니다. Firebase 설정을 확인해주세요.");
    throw error;
  }
};

export const deleteNote = async (id: string) => {
  if (!db) {
    // Fallback delete
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const notes: Note[] = JSON.parse(saved);
      const filtered = notes.filter(n => n.id !== id);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filtered));
      alert("Firebase가 설정되지 않았습니다. 임시로 로컬에서 삭제했습니다. (새로고침하면 반영됩니다)");
    }
    return;
  }

  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("삭제 실패:", error);
    alert("삭제에 실패했습니다.");
    throw error;
  }
};

export const getNotes = (): Note[] => [];