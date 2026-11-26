'use client';

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { Field } from '@/components/contact/Field';
import {
  CONTACT_FIELDS,
  EMPTY_VALUES,
  sendContact,
  validateContact,
  type ContactErrors,
  type ContactValues,
} from '@/components/contact/form-logic';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { cx } from '@/components/ui/variants';
import { SITE } from '@/content/site';

type Status = 'idle' | 'sending' | 'sent' | 'failed';

const subscribeToNothing = () => () => {};

/** False in the server's HTML, true once JavaScript runs the form. */
function useHydrated() {
  return useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false,
  );
}

/** The contact form. `/contact#formulario` links here. */
export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<ContactValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const hydrated = useHydrated();
  const sending = status === 'sending';

  // Disabling the button drops keyboard focus, so it is given back.
  useEffect(() => {
    if (status !== 'sent' && status !== 'failed') return;
    if (document.activeElement !== document.body) return;
    buttonRef.current?.querySelector('button')?.focus();
  }, [status]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (status === 'sent') setStatus('idle');
    // An error that is showing follows the typing until it is fixed.
    const field = CONTACT_FIELDS.find((item) => item === name);
    if (field && errors[field]) {
      setErrors({ ...errors, [field]: validateContact(next)[field] });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = CONTACT_FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      setStatus('idle');
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    setStatus('sending');
    const result = await sendContact(values);
    if (result === 'sent') setValues(EMPTY_VALUES);
    setStatus(result);
  }

  const fieldProps = (name: keyof ContactErrors) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    error: errors[name],
    readOnly: sending,
    onChange: handleChange,
  });

  return (
    // `method` keeps what was typed out of the address if the browser submits it.
    <form
      id='formulario'
      ref={formRef}
      method='post'
      noValidate
      aria-labelledby='formulario-titulo'
      onSubmit={handleSubmit}
      className={cx(
        'relative flex scroll-mt-4 flex-col gap-4 rounded-card bg-blush p-5 shadow-soft sm:p-6',
        className,
      )}
    >
      <Heading level={2} size='subtitle' id='formulario-titulo'>
        Contacto
      </Heading>
      <Field {...fieldProps('name')} label='Nombre' autoComplete='name' />
      <Field
        {...fieldProps('email')}
        label='Email'
        type='email'
        autoComplete='email'
      />
      <Field
        {...fieldProps('message')}
        multiline
        label='Mensaje'
        placeholder='Tu mensaje...'
        className='min-h-40'
      />
      {/* Honeypot: people never see or reach it, simple bots fill it in. */}
      <div aria-hidden='true' className='sr-only'>
        <input
          type='text'
          name='website'
          tabIndex={-1}
          autoComplete='off'
          value={values.website}
          onChange={handleChange}
        />
      </div>
      <p className='text-sm text-ink'>
        Usamos tu nombre, tu email y tu mensaje para responder a tu consulta. Los
        enviamos por email a través de Brevo.
      </p>
      {/* Both regions are always in the page, so their messages are announced. */}
      <div role='status' className='empty:-mt-4'>
        {status === 'sent' ? (
          <p className='rounded-field bg-navy p-3 font-semibold text-white'>
            ¡Gracias! Hemos recibido tu mensaje y te responderemos.
          </p>
        ) : null}
      </div>
      <div role='alert' className='empty:-mt-4'>
        {status === 'failed' ? (
          <p className='rounded-field border-2 border-rose-deep bg-white p-3 font-semibold wrap-break-word text-ink'>
            No hemos podido enviar tu mensaje. Inténtalo de nuevo o escríbenos a{' '}
            <a
              href={`mailto:${SITE.email}`}
              className='rounded-field underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy'
            >
              {SITE.email}
            </a>
            .
          </p>
        ) : null}
      </div>
      <div ref={buttonRef}>
        <Button
          type='submit'
          className='w-full'
          disabled={!hydrated}
          loading={sending}
        >
          {sending ? 'Enviando...' : 'Enviar mensaje'}
        </Button>
      </div>
    </form>
  );
}
