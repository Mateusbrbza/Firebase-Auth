import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputref = useRef();
  const passwordInputref = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputref.current.value;
    const enteredPassword = passwordInputref.current.value;
    // NOTE: could add validation here

    if (isLogin) {

    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8JW3d6XXCTcV-1Wz5wkk66pMzc7UofRs',
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      if (res.ok) {

      } else {
        return res.json().then(data => {
          console.log(data);
        });
      }
    });
  }
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
          ref={passwordInputref} 
          />
        </div>

        <div className={classes.actions}>
          <button>{isLogin ? 'Entrar' : 'Criar conta'}</button>
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
};

export default AuthForm;
