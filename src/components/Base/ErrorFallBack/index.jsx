import PropTypes from 'prop-types';

const ErrorFallBack = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error && error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

ErrorFallBack.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default ErrorFallBack;
