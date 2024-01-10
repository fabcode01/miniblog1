
import { useState, useEffect, useReducer } from "react";
import { db } from "../firebase/config";

//colletion > lugar que salva dados
//addDoc > insire documento no banco
//Timestamp > marca o horário que ele foi criado

import { doc, deleteDoc } from "firebase/firestore";

const initialState = {
  loading: null,
  error: null
};

const deleteReducer = (state, action) => {
  switch (action.type) {
    
    case "LOADING":
      return { loading: true, error: null };
    case "DELETED_DOC":
      return { loading: false, error: null };
    case "ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useDeleteDocument = (docColletion) => {
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  //memory leek
  const [cancelled, setCancelled] = useState(false);

  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      return;
    } else{
      dispatch(action)
    }
  };

  const deleteDocument = async (id) => {
    checkCancelBeforeDispatch({
      type: "LOADING"
    });

    try {
        
        const deletedDocument = await deleteDoc(doc(db, docColletion, id))
        checkCancelBeforeDispatch({
            type: "DELETED_DOC",
            payload: deletedDocument,
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
    deleteDocument,
    response
  };
};
