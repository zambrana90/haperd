import type { ChangeEventHandler, ComponentProps } from 'react';
import { cx } from '@/components/ui/variants';

const CONTROL_CLASSES =
  'w-full rounded-field border bg-white p-3 text-base text-ink placeholder:text-rose-ink hover:border-rose-deep focus-visible:ring-2 focus-visible:ring-rose-deep focus-visible:outline-none read-only:cursor-progress read-only:bg-off-white';

/** What an `<input>` and a `<textarea>` share, plus what only one of them uses. */
type ControlProps = Pick<
  ComponentProps<'input'>,
  'name' | 'value' | 'readOnly' | 'autoComplete' | 'placeholder' | 'className'
> & {
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  /** Ignored by a textarea. */
  type?: 'text' | 'email';
};

type FieldProps = ControlProps & {
  id: string;
  label: string;
  error?: string;
  multiline?: boolean;
};

/** A labelled control with its error message next to it. */
export function Field({
  id,
  label,
  error,
  multiline = false,
  type = 'text',
  className,
  ...controlProps
}: FieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    ...controlProps,
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    'aria-required': true,
    className: cx(
      CONTROL_CLASSES,
      error ? 'border-rose-deep ring-1 ring-rose-deep' : 'border-rose-soft',
      multiline ? 'flex-1 resize-none' : 'min-h-12',
      className,
    ),
  } as const;

  return (
    <div className={cx('flex flex-col', multiline && 'flex-1')}>
      <label htmlFor={id} className='mb-1 font-semibold text-ink'>
        {label}
      </label>
      {multiline ? <textarea {...shared} /> : <input {...shared} type={type} />}
      {/* Always in the page, so screen readers announce a new message. */}
      <p
        id={errorId}
        aria-live='polite'
        className='text-sm font-semibold text-rose-deep not-empty:mt-1'
      >
        {error}
      </p>
    </div>
  );
}
