import { useSearchParams, useNavigation, useActionData, Form } from '@remix-run/react';
import { FaLock, FaUserPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AuthForm() {

  const validateError = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams()
  const authMode = searchParams.get('mode') || 'login';

  const submitBtnCaption = authMode === 'login' ? 'Login' : 'Create User'
  const toggleBtnCaption = authMode === 'login' ? 'Create a new User' : 'Log in with existing user'

  const isSubmitting = navigation.state !== 'idle'

  return (
    <Form method="post" className="form" id="auth-form">
      <div className="icon-img">
        {authMode === 'login' ? <FaLock /> : <FaUserPlus />}
      </div>
      <p>
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" minLength={7} />
      </p>
      {validateError && (
        <ul>
          {Object.values(validateError).map((err) => (
            <li key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? "Authenticate..." : submitBtnCaption}</button>
        <Link to={authMode === 'login' ? '?mode=signup' : '?mode=login'}>{toggleBtnCaption}</Link>
      </div>
    </Form>
  );
}

export default AuthForm;
