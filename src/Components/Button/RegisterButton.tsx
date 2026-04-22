import styles from './RegisterButton.module.css';

interface RegisterButtonProps {
    text?: string;  
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;

}

export const RegisterButton = ({text,onClick,variant = 'primary',disabled = false}: RegisterButtonProps) => {
    const className = `${styles.registerButton} ${styles[variant]} ${disabled ? styles.disabled : ''}`; 
    return (
        <button type="button" className={className} onClick={onClick} disabled={disabled}>{text}</button>
    );
}
