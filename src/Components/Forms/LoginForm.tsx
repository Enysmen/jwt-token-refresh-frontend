import { useState } from 'react';
import { ButtonLogin } from '../Button/ButtonLogin';
import styles from './LoginFormStyle.module.css';
import { RegisterButton } from '../Button/RegisterButton';


export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);


    // async login operation
  }

  
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>

      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>

      <ButtonLogin isLoading={isLoading} disabled={!email || !password} /> 
      <RegisterButton text="Register" variant="secondary"/> {/*//TODO: add to navigate register page(onClick delegate)*/}
    </form>
  );
}