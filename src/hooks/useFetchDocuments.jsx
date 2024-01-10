import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollention, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //memory leek
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (cancelled) return;

      setLoading(true);

      const colletionRef = await collection(db, docCollention);

      try {
        let q;

        //busca
        //dashboard

        if (search) {
          q = await query(
            colletionRef,
            where("tagArrays", "array-contains", search),
            orderBy("createAt", "desc")
          );
        } else if (uid){
          q = await query(
            colletionRef,
            where('uid', '==', uid ),
            orderBy("createAt", "desc")
          );
        } else {
          q = await query(colletionRef, orderBy("createAt", "desc"));
        }

        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map((docs) => ({
              id: docs.id,
              ...docs.data(),
            }))
          );
        });

        setLoading(false);
      } catch (e) {
        console.log(e);
        setError(e.message);
        setLoading(false);
      }
    }

    loadData();
  }, [docCollention, search, uid, cancelled]);

  useEffect(() => {
    return () => {
      setCancelled(true);
    };
  }, []);

 

  return { documents, loading, error };
};
