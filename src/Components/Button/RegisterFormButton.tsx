import styles from './RegisterFormButton.module.css';

interface RegisterFormButtonProps {
  isLoading?: boolean;
  disabled?: boolean;
}

export const RegisterFormButton = ({
  isLoading = false,
  disabled = false,
}: RegisterFormButtonProps) => {
  return (
    <button
      type="submit"
      className={styles.registerButton}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Creating account...' : 'Register'}
    </button>
  );
};