import styles from 'RegisterPage.module.css';
import { RegisterForm } from '../../Components/Forms/RegisterForm';

export function RegisterPage() {
  function handleRegisterSubmit(data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    // TODO: call authService.register(data)
    // TODO: handle API validation errors
    // TODO: show error message
    // TODO: redirect to login page after success

    console.log('Register data submitted:', data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <h1 className={styles.title}>Create Account</h1>

          {/* TODO: show global registration error */}

          <RegisterForm onSubmit={handleRegisterSubmit} />
        </div>
      </div>
    </div>
  );
}