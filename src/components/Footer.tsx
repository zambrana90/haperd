export function Footer() {
  return (
    <footer
      className='w-full flex items-center justify-between px-5 py-3 text-white text-sm font-mono'
      style={{ backgroundColor: 'rgb(189, 138, 135)' }}
    >
      <div className='flex flex-col sm:flex-row items-center justify-between px-5 py-3 text-white text-sm font-mono w-full max-w-[1600px] mx-auto'>
        <span className='mb-3 sm:mb-0'>
          2025 All rights Reserved Haperd&Co.
        </span>
        <div className='flex gap-5'>
          {/* Instagram Icon */}
          <a href='#' aria-label='Instagram' className='block'>
            <svg
              width='36'
              height='36'
              viewBox='0 0 36 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                x='6'
                y='6'
                width='24'
                height='24'
                rx='7'
                stroke='white'
                strokeWidth='2'
              />
              <circle cx='18' cy='18' r='7' stroke='white' strokeWidth='2' />
              <circle cx='25.5' cy='12.5' r='1.5' fill='white' />
            </svg>
          </a>
          {/* WhatsApp Icon */}
          <a href='#' aria-label='WhatsApp' className='block'>
            <svg
              width='36'
              height='36'
              viewBox='0 0 36 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle cx='18' cy='18' r='16' stroke='white' strokeWidth='2' />
              <path
                d='M24 22.5c-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.5-.89-.79-1.49-1.76-1.67-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.57-.48-.5-.67-.51-.17-.01-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.26 5.18 4.44.72.28 1.28.45 1.72.58.72.23 1.38.2 1.9.12.58-.09 1.75-.72 2-1.41.25-.7.25-1.3.17-1.41-.09-.12-.27-.19-.57-.34z'
                stroke='white'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
