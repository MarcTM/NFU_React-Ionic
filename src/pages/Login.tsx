import React, { useContext, useState, useRef, useEffect } from 'react';
import { AppContext } from '../State';
import { useHistory } from 'react-router-dom';

import { 
    IonContent, 
    IonItem,
    IonInput,
    IonButton,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonLoading
} from '@ionic/react';

const Login = () => {
    const { state, dispatch } = useContext(AppContext);
    const [ email, setEmail ] = useState<React.ReactText | undefined>('');
    const [ password, setPassword ] = useState<React.ReactText | undefined>('');
    const [ , setFormErrors ] = useState(null);
    const [ showLoading, setShowLoading ] = useState(false);
    
    const history = useHistory();
    const formRef = useRef(null);


    // useEffect(() => {
    //     let isMounted = true;
    //     someAsyncOperation().then(data => {
    //       if (isMounted) setState(data);
    //     })
    //     return () => { isMounted = false };
    // });
      
    // Submit login form
    function handleSubmit(e) {
        e.preventDefault();
    
        try {            
          setShowLoading(true);
          setTimeout(()=> {           
                setShowLoading(false)   
                dispatch({type:'SET_USER',value:email});
                history.push("/app/home")
          },1000);
          
        } catch (e) {
          console.error(e);
          setShowLoading(false);
          setFormErrors(e);
        }
    }
    

    return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="light">
                <IonTitle>{'NFU'}</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent className="form">
            <IonLoading isOpen={showLoading} message={'Logging in'} onDidDismiss={() => setShowLoading(false)}/>
            <form onSubmit={e => (handleSubmit(e))} method="post" ref={formRef} action="">
                <IonList>
                    <IonItem>
                        <IonLabel position={'fixed'}>Email</IonLabel>
                        <IonInput type="email" required value={email} onInput={e => setEmail(e.currentTarget.value)} />
                    </IonItem>

                    <IonItem>
                        <IonLabel position={'fixed'}>Password</IonLabel>
                        <IonInput
                        type="password"
                        value={password}
                        required
                        onInput={e => setPassword(e.currentTarget.value)}
                        />
                    </IonItem>
                    
                    <IonButton expand="block" type="submit">Login</IonButton>
                </IonList>
            </form>

            <div className="below-form">
                <a href="#/" onClick={(e) => { e.preventDefault(); }}>Forgotten Passowrd ?</a>
            </div>
        </IonContent>
    </IonPage>
    );
};

export default Login;