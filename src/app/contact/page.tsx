'use client';

import React, { useState } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { FAQCollapse } from '@/components/FAQCollapse';

export default function Contact() {
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
    <div className='flex flex-col min-h-screen bg-white'>
      <Header variant='compact' />
      <main id='main' className='flex-1 w-full bg-white mb-24'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 md:px-0 pt-6 md:pt-24'>
          <div className='flex flex-col md:flex-row gap-6 md:gap-10 justify-between'>
            {/* Left: FAQ and intro */}
            <div className='w-full md:flex-1 md:pr-12 mb-8 md:mb-0'>
              <h1 className='font-mono text-xl sm:text-2xl md:text-3xl text-ink mb-6 md:mb-10 text-center md:text-left'>
                ¿Quieres ilustración en <br className='hidden md:block' />
                vivo para tu evento?
              </h1>
              <div className='text-rose-ink font-mono text-base md:text-[15px] mb-8 max-w-125'>
                <div className='mb-3'>
                  ¡Entonces hablemos!
                  <br />
                  Mi servicio de Live Art Illustration transforma momentos en
                  recuerdos ilustrados, en tiempo real. Bodas, eventos de marca,
                  celebraciones privadas... cualquier ocasión con alma merece
                  ser contada con pinceles y color.
                </div>
                <div className='mb-3'>
                  <span className='font-bold text-ink'>
                    ¿Es una boda?
                  </span>
                  <br />
                  Perfecto. Puedes rellenar el formulario que tienes a
                  continuación y nos ponemos en marcha para crear algo tan único
                  como vosotros.
                </div>
                <div className='mb-3'>
                  <span className='font-bold text-ink'>
                    ¿Es un evento de empresa o marca?
                  </span>
                  <br />
                  Genial. Escríbeme directamente a{' '}
                  <a href='mailto:hola@haperd.com' className='underline'>
                    hola@haperd.com
                  </a>{' '}
                  contándome un poquito sobre la idea y te preparo una propuesta
                  a medida.
                </div>
                <div>
                  Cada evento es diferente, y eso es lo que más me gusta. Lo
                  importante es que tengas algo especial que todos recuerden...
                  y se lleven a casa.
                </div>
              </div>
            </div>
            {/* Right: Contact box */}
            <div className='w-full md:w-[320px] flex flex-col'>
              <label className='font-mono text-lg text-ink mb-2'>
                Contacto
              </label>
              <textarea
                className='border border-rose-soft rounded-md min-h-[150px] md:min-h-[400px] w-full p-3 font-mono text-ink bg-white resize-none mb-4 focus-visible:ring-2 focus-visible:ring-rose-deep focus-visible:outline-none'
                placeholder='Tu mensaje...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                type='button'
                className={`rounded-full bg-rose-deep text-white font-mono text-xl px-8 py-3 mt-2 shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-rose-deep focus:ring-offset-2 w-full cursor-pointer ${
                  !message.trim() || loading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-navy hover:-translate-y-1 hover:shadow-xl'
                }`}
                disabled={!message.trim() || loading}
                onClick={handleSend}
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className='mt-16'>
            <h2 className='font-mono text-xl md:text-2xl text-ink text-center mb-8'>
              Preguntas Frecuentes
            </h2>
            <div className='flex flex-col gap-4 mx-auto'>
              {/* FAQCollapse examples */}
              {/* Import FAQCollapse at the top of the file */}
              <FAQCollapse
                question='¿Cuánto dura una ilustración en vivo durante el evento?'
                answer='La duración depende del tipo de evento y la cantidad de ilustraciones solicitadas, pero normalmente cada ilustración toma entre 10 y 20 minutos.'
              />
              <FAQCollapse
                question='¿Puedo personalizar el estilo de la ilustración?'
                answer='¡Por supuesto! Antes del evento hablaremos sobre tus preferencias de estilo, colores y detalles para que las ilustraciones reflejen tu personalidad y el espíritu del evento.'
              />
              <FAQCollapse
                question='¿Qué necesito proporcionar para reservar el servicio?'
                answer='Solo tienes que ponerte en contacto conmigo y contarme un poco sobre tu evento. A partir de ahí, te guiaré en los siguientes pasos y requisitos para la reserva.'
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
