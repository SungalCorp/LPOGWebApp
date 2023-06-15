

import { Form } from 'react-router-dom';
import './LoginBox.css';

function LoginBox() {
  return (
    <div className='loginContainer'>
      <Form method="post" className='loginForm'>
        <div className='loginFormControl'>
          <label htmlFor="username">Username</label>
          <input id="username" type="username" name="username" required />
        </div>

        <div className='loginFormControl'>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className='loginButtonContainer'>
          <button className='loginButton'>Sign In</button>
        </div>
      </Form>
    </div>
  );
}

export default LoginBox;


