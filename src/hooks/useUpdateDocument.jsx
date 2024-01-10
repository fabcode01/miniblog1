import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

//colletion > lugar que salva dados
//addDoc > insire documento no banco
//Timestamp > marca o horário que ele foi criado

import { updateDoc, doc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null
};

const updateReducer = (state, action) => {
  switch (action.type) {
    
    case "LOADING":
      return { loading: true, error: null };
    case "UPDATE_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useUpdateDocument = (docColletion) => {
  const [response, dispatch] = useReducer(updateReducer, initialState);

  //memory leek
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      return;
    } else{
      dispatch(action)
    }
  };

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispatch({
      type: "LOADING"
    });

    try {
      const docRef = await doc(db, docColletion, id)

      const updateDocument = await updateDoc(docRef,data)

      checkCancelBeforeDispatch({
        type: "UPDATE_DOC",
        payload: updateDocument,
      });
    } catch (error) {
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);



  return {
    updateDocument,
    response
  };
};
