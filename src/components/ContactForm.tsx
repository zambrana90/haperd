'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cx } from '@/components/ui/variants';

/** The message box. `/contact#formulario` links here. */
export function ContactForm({ className }: { className?: string }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      setMessage('');
    } catch (err) {
      // Optionally handle error (show toast, etc)
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id='formulario'
      className={cx(
        'flex scroll-mt-4 flex-col rounded-card bg-blush p-5 shadow-soft sm:p-6',
        className,
      )}
    >
      <label className='mb-3 font-serif text-xl text-ink'>Contacto</label>
      <textarea
        className='mb-4 min-h-40 w-full flex-1 resize-none rounded-field border border-rose-soft bg-white p-3 text-base text-ink placeholder:text-rose-ink focus-visible:ring-2 focus-visible:ring-rose-deep focus-visible:outline-none lg:min-h-80'
        placeholder='Tu mensaje...'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        className='w-full'
        disabled={!message.trim()}
        loading={loading}
        onClick={handleSend}
      >
        {loading ? 'Enviando...' : 'Enviar mensaje'}
      </Button>
    </div>
  );
}
