import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import AuthContext from '../../store/auth-context';

const AuthForm = () => {
  const history = useHistory();
  const emailInputref = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => { 
    event.preventDefault();

    const enteredEmail = emailInputref.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    let url;
  
    if (isLogin) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8JW3d6XXCTcV-1Wz5wkk66pMzc7UofRs';
      } else {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8JW3d6XXCTcV-1Wz5wkk66pMzc7UofRs'
      }

      const sendData = async () => {
        const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "aplication/json"},
        });
        const data = await response.json();
        
        setIsLoading(false);

        if(response.ok) {
          return data;
        } else {
          let errorMessage= "Falha na autenticacao";
          if(data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      };
      sendData()
      .then((data) => {
        authCtx.login(data.idToken);
        history.replace('/');
      })
      .catch((err) => {
        alert(err.message);
    });
   };
  
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Criar conta'}</h1>
      <form onSubmit={submitHandler} >
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input 
          type='email' 
          id='email' 
          required 
          ref={emailInputref} 
          />
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Senha</label>
          <input 
          type='password' 
          id='password' 
          required 
          ref={passwordInputRef} 
          />
        </div>

        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Entrar' : 'Criar conta'}</button>}
          {isLoading && <p>Enviando solicitacao...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Criar conta' : 'Entrar com conta existente'}
          </button>
        </div>
      </form>
    </section>
  );
}

  export default AuthForm;