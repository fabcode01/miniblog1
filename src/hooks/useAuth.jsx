import{db} from '../firebase/config'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth'

import {
    useState,
    useEffect
} from 'react'

export const useAuth = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //cleaup
    //deal with memory leek
    //cancelar acoes futuras de components

    //Um exemplo mais didatico: Você tem uma função que executa uma busca no banco de dados, mais voce só precisa que essa função seja executada quando acessa a página profile da aplicação. Se essa função de busca no banco de dados estiver vazando, ela será executada ao acessar qualquer rota da aplicação, cunsumindo de forma desnecessário o servidor, além de prejudicar na performace.
    const [cancelado, setCancelado] = useState(false)

    const auth = getAuth()

    function checarSeEstaCancelado() {
        if (cancelado){
            return;
        }
    }


    //register
    const createUser = async (data) => {
        checarSeEstaCancelado()

        setLoading(true)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false)
            return user

        } catch (error) {
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage

            if(error.message.includes('email-already')){
                systemErrorMessage = 'Email já está em uso.'
            } else{
                systemErrorMessage = 'Ocorreu um erro, tente novamente.'
            }

            setLoading(false)
            setError(systemErrorMessage)

        }

        
    }

    //signout

    const logout = ()=>{
       
        checarSeEstaCancelado()
        signOut(auth)
    }

    //login

    const login = async(data)=>{
        checarSeEstaCancelado()

        setLoading(true)
        setError(false)

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
        } catch(error){
            let systemErrorMessage
            console.log(error)

            if(error.message.includes('auth/invalid-credential')){
                systemErrorMessage = 'Email ou senha incorretos.'
            } else if(error.message.includes('auth/too-many-requests')){
                systemErrorMessage = 'Muitas tentativas de login inválidas nessa conta, tente novamente mais tarde.'
            }
            
            else (
                systemErrorMessage = 'Algo deu errado.'
            )

            setError(systemErrorMessage)
            setLoading(false)
        }

       

    }

   

    //evitar vazamento de memoria
    useEffect(()=>{
        return()=> setCancelado(true)
    },[])

    // --------------------------------

    return{
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }

};