import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const { closeModal } = useModal();

  console.log('sess', sessionUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await dispatch(sessionActions.login({ credential, password }))
      navigate('/');
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data?.message) {
        console.log('is errorring')
        setErrors(data.message);
        setLoginError(data.message);
      }
    }
  };

  const demoUser = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    closeModal();
    navigate('/')
  }

  const handleCredentialChange = (e) => {
    setCredential(e.target.value);
    setIsSubmitDisabled(e.target.value.length < 4 || password.length < 6)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsSubmitDisabled(e.target.value.length < 6 || credential.length < 4)
  }

  console.log('login errors', errors);

  return (
    <div className="login-form">
      <h1 className="login-header">Log In</h1>
      <div className="credentials-error-container">
        <h2 className="credentials-error">{loginError}</h2>
      </div>
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
