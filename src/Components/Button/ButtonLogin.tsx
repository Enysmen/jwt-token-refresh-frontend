import styles from './ButtonLogin.module.css';

interface ButtonLoginProps {
  isLoading?: boolean;
  disabled?: boolean;
}

export const ButtonLogin = ({isLoading = false,disabled = false,}: ButtonLoginProps) => {
  return (
    <button type="submit" className={styles.buttonLogin} disabled={disabled || isLoading} > {isLoading ? 'Loading...' : 'Login'} </button>
  )
};