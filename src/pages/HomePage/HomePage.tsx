import styles from './HomePage.module.css';

export function HomePage() {
  // TODO: get the current user from authService
  // const user = authService.getCurrentUser();

  // TODO: get an access token
  // const accessToken = authService.getAccessToken();

  // TODO: get a refresh token
  // const refreshToken = authService.getRefreshToken();

  // TODO: get a user role
  // const role = authService.getUserRole();

  // TODO: get token expiration
  // const tokenExpiration = authService.getTokenExpiration();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.layout}>
          <h1 className={styles.title}>Home</h1>

          {/* USER INFORMATION SECTION */}
          <div className={styles.card}>
            <h2>User Information</h2>

            {/* TODO: replace the mock with real data */}
            <p><strong>Username:</strong> {/* user.username */} -</p>
            <p><strong>Role:</strong> {/* role */} -</p>
          </div>

          {/* TOKEN INFORMATION SECTION */}
          <div className={styles.card}>
            <h2>Token Information</h2>

            {/* TODO: show shortened access token */}
            <p><strong>Access Token:</strong></p>
            <div className={styles.tokenBox}>
              {/* accessToken */}
              -
            </div>

            {/* TODO: show a shortened refresh token */}
            <p><strong>Refresh Token:</strong></p>
            <div className={styles.tokenBox}>
              {/* refreshToken */}
              -
            </div>

            {/* TODO: display token lifetime */}
            <p><strong>Expires At:</strong> {/* tokenExpiration */} -</p>
          </div>

          {/* LOGOUT SECTION */}
          <div className={styles.actions}>
            {/* TODO: call authService.logout() */}
            <button className={styles.logoutButton}>
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}