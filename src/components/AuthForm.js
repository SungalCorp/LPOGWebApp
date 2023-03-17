

import { Form } from 'react-router-dom';
import classes from './AuthForm.module.css';

function AuthForm() {
  return (
    <div className={classes.container}>
      <Form method="post" className={classes.form}>
        <div className={classes.formControl}>
          <label htmlFor="username">Username</label>
          <input id="username" type="username" name="username" required />
        </div>

        <div className={classes.formControl}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className={classes.actions}>
          <button className={classes.button}>Sign In</button>
        </div>
      </Form>
    </div>
  );
}

export default AuthForm;


