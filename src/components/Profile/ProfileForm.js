import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>Nova senha</label>
        <input type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Mudar senha</button>
      </div>
    </form>
  );
}

export default ProfileForm;
// NOTE
