import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
    .then(closeModal)
    .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
          setLoginError(data.errors);
        }
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    .then(closeModal)
  }

  const handleCredentialChange = (e) => {
    setCredential(e.target.value);
    setIsSubmitDisabled(e.target.value.length < 4 || password.length < 6)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsSubmitDisabled(e.target.value.length < 6 || credential.length < 4)
  }

  return (
    <div className="loginForm">
      <h1>Log In</h1>
      <h2>{loginError}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credential}
          onChange={handleCredentialChange}
          placeholder="Username or Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          required
        />
        {errors.credential && <p>{errors.credential}</p>}
        <button className='login-submit' type="submit" disabled={isSubmitDisabled}>Log In</button>
        <a onClick={demoUser} className='demo-user'>Demo User</a>
      </form>
    </div>
  );
}

export default LoginFormModal;
