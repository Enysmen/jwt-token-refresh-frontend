import React from 'react';
import {LoginForm} from '../../Components/Forms/LoginForm';
import styles from './LoginStyle.module.css';


export function LoginPage() {
  // TODO: manage global login state, errors, redirects, etc.
  function handleLoginSubmit(data: {email: string;password: string;}) {
    // TODO: send login request in authservice
    // TODO: handle errors and show feedback to user
    // TODO: redirect on success
    console.log('Login data submitted:', data);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <h1 className={styles.title}>Sign in</h1>

          {/* place for global error page */}
          {/* TODO: show login error */}
          {/* <div className={styles.error}>Invalid credentials</div> */}

          <LoginForm  /> // get error onSubmit={handleLoginSubmit}

          <div className={styles.footer}>
            <span>Don’t have an account?</span>
            // TODO: link to registration button Component 
            <a href="/register" className={styles.link}>
              Register
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



