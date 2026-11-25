import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQCollapse({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className='border border-[#b18a8b] rounded-md bg-white mb-2'>
      <button
        type='button'
        className='w-full flex items-center justify-between p-4 font-mono text-[#2a2341] text-lg focus:outline-none cursor-pointer'
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span
          className={`transition-transform duration-200 ml-2 ${
            open ? 'rotate-90' : ''
          }`}
          aria-hidden='true'
        >
          ▶
        </span>
        <span className="text-left w-full pl-[12px]">{question}</span>
      </button>
      {open && (
        <div className='px-4 pb-4 text-[#b18a8b] font-mono text-base animate-fade-in'>
          {answer}
        </div>
      )}
    </div>
  );
}
