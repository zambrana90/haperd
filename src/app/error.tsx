'use client';

// The error itself is not shown or logged: visitors never see internal details.
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div style={{ padding: 40, color: 'red', fontFamily: 'monospace' }}>
      <h1>Algo ha salido mal</h1>
      <p>No hemos podido mostrar esta página. Inténtalo de nuevo.</p>
      <button onClick={reset} style={{ marginTop: 20 }}>
        Reintentar
      </button>
    </div>
  );
}
