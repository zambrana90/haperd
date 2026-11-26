import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header variant='large' />
        <main id='main' className='flex-1 w-full bg-white'>
          <div className='w-full max-w-[900px] mx-auto px-4 md:pl-[100px] pt-6'>
            <h1 className='font-serif text-2xl md:text-[56px] text-ink mb-2 leading-none'>
              About us
            </h1>
          </div>

          <div className='flex flex-col md:flex-row items-start gap-8 md:gap-16 px-4 sm:px-8 md:px-16 pb-6 max-w-6xl mx-auto'>
            {/* Left: Circular Image with background circle */}
            <div className='relative flex-shrink-0 flex items-center justify-center w-full md:w-auto mb-6 md:mb-0'>
              <div className='absolute left-1 top-0 md:left-4 md:top-2 w-[260px] h-[260px] bg-blush rounded-full -z-10' />
              <Image
                src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=320&h=320&facepad=2&q=80' // placeholder
                alt='María - Haperd&Co.'
                className='w-[220px] h-[220px] object-cover rounded-full grayscale border-8 border-white shadow-xl ml-7.5'
                width={220}
                height={220}
              />
            </div>
            {/* Right: Text Content */}
            <div className='flex-1 flex flex-col justify-start items-start mt-2'>
              <div className='text-rose-ink font-sans font-medium text-base md:text-lg leading-relaxed max-w-2xl'>
                <p className='mb-3 text-lg'>
                  La mente (y el pincel) detrás de Haperd&Co.
                  <br />
                  <span className='font-semibold text-lg'>
                    ¡Hola! Soy María,
                  </span>{' '}
                  y estoy al mando en este pequeño universo llamado Haperd&Co. Y
                  aunque hoy me dedico a diseñar papelería para bodas, en
                  realidad pinto desde que tengo memoria (y probablemente antes,
                  si preguntas a mi madre).
                </p>
                <p className='mb-3 text-lg'>
                  Desde muy pequeña, los lápices, las acuarelas y todo tipo de
                  manualidades han sido mi forma de entender el mundo. Mientras
                  otros niños hacían castillos de arena, yo los dibujaba.
                  Mientras otros corrían por el parque, yo me quedaba mirando
                  cómo la luz cambiaba el color de las hojas. Sí, era esa niña
                  rara del cuaderno en mano. Spoiler: sigo siéndolo.
                </p>
                <p className='mb-3 text-lg'>
                  Con el tiempo, convertí mi pasión en profesión, estudié diseño
                  gráfico y así fue como años después nació Haperd&Co, un lugar
                  donde se mezclan el diseño, la emoción y un poquito de magia
                  con olor a papel nuevo. Me encanta crear cosas que hagan
                  sonreír, que emocionen, que hagan a alguien decir: “¡Esto
                  somos nosotros!”
                </p>
                <p className='mb-3 text-lg'>
                  No creo en las bodas en serie, ni en las plantillas sin alma.
                  Creo en las historias auténticas, en los detalles con sentido,
                  en los dibujos hechos con cariño y en las invitaciones que
                  hacen llorar a tu tía en cuanto las abre.
                </p>
                <p className='mb-3 text-lg'>
                  ¿Y sabéis qué es lo mejor? Que no estoy sola. A veces me
                  acompaña un pincel en mano en plena boda, capturando momentos
                  en vivo que se convierten en recuerdos ilustrados. Otras veces
                  estoy detrás del ordenador, diseñando algo que todavía no
                  existe, pero que ya late con vuestra esencia.
                </p>
                <p className='mb-3 text-lg'>
                  Así que si habéis llegado hasta aquí y sentís que esto va con
                  vosotros… Bienvenidos a Haperd.
                </p>
                <p className='mb-3 text-lg'>Aquí, cada trazo cuenta.</p>
                <div className='mt-5 font-script font-normal text-xl md:text-2xl'>
                  con cariño
                  <br />
                  María
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
