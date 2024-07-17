import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    return dispatch(
      sessionActions.signup({
        email,
        username,
        firstName,
        lastName,
        password
      })
    )
    .then(closeModal)
    .catch(async (res) => {
      const data = await res.json();
      if (data?.errors) {
        setErrors(data.errors)
      }
    })

    console.log('errors from data', errors);
    // if (password === confirmPassword) {
    //   setErrors({});
    //   return dispatch(
    //     sessionActions.signup({
    //       email,
    //       username,
    //       firstName,
    //       lastName,
    //       password
    //     })
    //   )
    //     .then(closeModal)
    //     .catch(async (res) => {
    //     const data = await res.json();
    //     if (data?.errors) {
    //       setErrors(data.errors);
    //     }
    //   });
    // }
    // console.log('errors in submit', errors);
    // return setErrors({
    //   confirmPassword: 'Confirm Password field must be the same as the Password field'
    // });
  };

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="label-error">
          <label htmlFor="email">Email</label>
          {errors.email && <p>{errors.email}</p>}
        </div>
        <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            // required
          />
        <div className="label-error">
          <label htmlFor="username">Username</label>
          {errors.firstName && <p>{errors.username}</p>}
        </div>
        <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            // required
          />
        <div className="label-error">
          <label htmlFor="first-name">First Name</label>
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <input
            type="text"
            name="first-name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            // required
          />
        <div className="label-error">
          <label htmlFor="last-name">Last Name</label>
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <input
            type="text"
            name="last-name"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            // required
          />
        <div className="label-error">
          <label htmlFor="password">Password</label>
          {errors.password && <p>{errors.password}</p>}
        </div>
        <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            // required
          />
        <div className="label-error">
          <label htmlFor="confirm-password">Confirm Password</label>
          {errors.confirmPassword && (<p>{errors.confirmPassword}</p>)}
        </div>
        <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            // required
          />
        <button className="signup-submit" type="submit" disabled={errors.length}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
