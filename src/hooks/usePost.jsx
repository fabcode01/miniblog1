import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  doc, getDoc
} from "firebase/firestore";

export const usePost = (docCollention, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //memory leek
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) return;

      setLoading(true);

      try{
        const docRef = await doc(db, docCollention, id)
        const docSnap = await getDoc(docRef)

        
        setDocument(docSnap.data())

        setLoading(false);
      }catch(error){
        setError(error.message)
        console.log(error)

        setLoading(false);
      }





    }

    loadDocument();
  }, [docCollention, id, document]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);



  return { document, loading, error };
};
