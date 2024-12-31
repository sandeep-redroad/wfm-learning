import React from 'react';

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops! Something went wrong.</h1>
      <p>We are working on fixing the issue. Please try again later.</p>
      <button onClick={() => window.location.reload()}>Retry</button>
    </div>
  );
};

export default ErrorPage;