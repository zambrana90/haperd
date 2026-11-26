import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header variant='large' />

      <main id='main' className='flex-1 flex flex-col mb-auto bg-rose text-ink'>
        <div className='flex flex-col md:flex-row w-full max-w-6xl pb-10 mx-auto justify-between gap-6 md:gap-10 px-4 sm:px-8'>
          <section className='flex flex-col items-start w-full md:w-3xl pt-12 md:pt-24 mb-0'>
            <p className='mb-6 text-xl'>
              En Haperd and Co. no hacemos papelería, creamos momentos.
              <br />
              <span className='font-bold'>Invitaciones</span> que cuentan
              historias, <span className='italic'>menús</span> que se leen con
              una sonrisa y <span className='font-bold'>detalles</span> que
              hacen que cada invitado se sienta parte de algo único. Nuestro
              equipo está para escucharos, soñar con vosotros y dar forma a esa
              invitación que solo podía ser vuestra. ¿Clásica y elegante?
              Perfecto. ¿Divertida, diferente y un poquito loca? ¡También nos
              encanta!
            </p>
          </section>
          {/* Right column */}
          <div className='hidden md:block flex-grow' />
          <section className='flex flex-col items-start justify-between md:pt-12'>
            <h1 className='text-6xl md:text-8xl font-serif font-bold ml-auto w-full text-center md:py-16'>
              Haperd
            </h1>
            <div className='w-full max-w-lg mt-8 md:mt-0'>
              <h2 className='text-2xl font-serif mb-6'>¿Qué ofrecemos?</h2>
              <p className='mb-6 text-xl'>
                Nos mueve el amor, el diseño y todo lo que se sale del molde.
                Queremos conoceros, saber qué os hace especiales, cómo os
                conocisteis, cuál es vuestra canción... y usar todo eso como
                inspiración para crear una papelería de boda con vuestra
                esencia, pensada al detalle y hecha totalmente a medida.
                <br />
                Nada de copiar y pegar.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
