import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LiveArt() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header variant='large' />
        <main id='main' className='flex-1 flex flex-col mb-auto bg-rose text-ink'>
          <div className='w-full max-w-[900px] pr-0 md:pr-6 mx-auto px-4'>
            {/* One heading; from md the two words are stacked and staggered. */}
            <h1 className='text-6xl md:text-8xl font-serif font-bold w-full text-center md:text-right pt-8 md:pt-4 md:-mb-12'>
              <span className='md:block md:pr-12'>Live</span>{' '}
              <span className='md:block md:text-9xl'>art</span>
            </h1>
          </div>
          <div className='flex flex-col md:flex-row w-full max-w-6xl pb-10 mx-auto justify-between gap-6 md:gap-10 px-4 sm:px-8'>
            {/* Left column: Text */}
            <section className='flex flex-col items-start font-mono w-full md:w-3xl pt-12 md:pt-24 mb-8 md:mb-0'>
              <p className='mb-6 text-lg md:text-xl'>
                Y atención, que aquí viene la magia...
                <br />
                ¿Conoces la papelería creativa? ¿Y el arte en vivo en eventos?
                Te lo contamos...
              </p>
              <p className='mb-6 text-lg md:text-xl'>
                Tenemos un servicio que convierte los recuerdos en arte en
                tiempo real: arte en vivo. Sí, como lo lees. Nuestro equipo de
                artistas se planta en vuestro evento pincel en mano para
                capturar los momentos más bonitos y retratar a vuestros
                invitados en directo.
              </p>
              <p className='text-lg md:text-xl'>
                Cada ilustración se convierte en un regalo único, emotivo y
                absolutamente inolvidable que se llevan a casa. ¡La gente
                alucina!
              </p>
            </section>
            {/* Right column: Heading and Buttons */}
            <div className='flex-grow' />
            <section className='flex flex-col items-start justify-end w-full md:w-auto'>
              <div className='flex flex-col gap-6 w-full items-center'>
                <button className='bg-white text-rose-deep font-mono text-xl px-4 py-2 rounded-xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl w-full cursor-pointer'>
                  ¿Hablamos?
                </button>
                <button className='bg-white text-rose-deep font-mono text-xl px-4 py-2 rounded-xl shadow-lg transition hover:-translate-y-1 hover:shadow-xl w-full cursor-pointer'>
                  ¿Cómo trabajamos?
                </button>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
