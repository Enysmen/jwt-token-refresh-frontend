import { useState } from 'react';
import { RegisterFormButton } from '../Button/RegisterFormButton';
import styles from './RegisterForm.module.css';

interface RegisterFormProps {
  onSubmit: (data: {email: string;password: string;confirmPassword: string;}) => void;
}

export const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
        {/*//TODO: show error message to user about "Passwords do not match"*/}
      return;
    }

    setIsLoading(true);

    onSubmit({ email, password, confirmPassword });

    // TODO: remove when API is connected
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      <input className={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input className={styles.input} type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

      <RegisterFormButton isLoading={isLoading} disabled={!email || !password || !confirmPassword} />
    </form>
  );
};