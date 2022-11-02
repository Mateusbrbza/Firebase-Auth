import { useRef, useContext } from 'react';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // could add validation here

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC8JW3d6XXCTcV-1Wz5wkk66pMzc7UofRs', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      //assumindo que sempre dara certo
      console.log("senha alterada")
    })
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>Nova senha</label>
        <input type='password' id='new-password' minLengh="5" ref={newPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Mudar senha</button>
      </div>
    </form>
  );
}

export default ProfileForm;
// NOTE
