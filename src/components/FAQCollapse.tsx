import type { FaqItem } from '@/content/faq';

/**
 * One question and its answer. A native `<details>`, so it works with the
 * keyboard and without JavaScript, and the answer is always in the HTML.
 */
export function FAQCollapse({ question, answer }: FaqItem) {
  return (
    <details className='group rounded-field border border-rose-soft bg-white'>
      <summary className='flex min-h-12 cursor-pointer list-none items-center gap-3 rounded-field p-4 text-lg font-semibold text-ink hover:bg-blush focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy [&::-webkit-details-marker]:hidden'>
        <svg
          aria-hidden='true'
          viewBox='0 0 16 16'
          className='size-4 shrink-0 fill-current group-open:rotate-90 motion-safe:transition-[rotate] motion-safe:duration-fast motion-safe:ease-gentle'
        >
          <path d='M4 2l10 6-10 6z' />
        </svg>
        <span className='min-w-0'>{question}</span>
      </summary>
      <p className='px-4 pt-2 pb-4 text-base text-ink'>{answer}</p>
    </details>
  );
}
