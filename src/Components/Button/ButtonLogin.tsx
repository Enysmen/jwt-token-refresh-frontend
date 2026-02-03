import styles from './ButtonLogin.module.css';

interface ButtonLoginProps {
  text?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

export const ButtonLogin = ({text = 'Login',isLoading = false,disabled = false,}: ButtonLoginProps) => {
  return (
    <button type="submit" className={styles.buttonLogin} disabled={disabled || isLoading} > {isLoading ? 'Loading...' : text} </button>
  )
};