'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <div style={{ padding: 40, color: 'red', fontFamily: 'monospace' }}>
      <h1>Something went wrong!</h1>
      <p>{error.message}</p>
      <button onClick={reset} style={{ marginTop: 20 }}>
        Try Again
      </button>
    </div>
  );
}
