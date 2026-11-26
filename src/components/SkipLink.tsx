/** The first focusable element: off screen until it gets keyboard focus. */
export function SkipLink() {
  return (
    <a
      href='#main'
      className='fixed top-2 left-2 z-60 flex min-h-11 -translate-y-24 items-center rounded-pill bg-navy px-6 font-sans font-semibold text-white focus:translate-y-0 focus:outline-2 focus:outline-offset-2 focus:outline-navy focus:ring-2 focus:ring-white'
    >
      Saltar al contenido
    </a>
  );
}
