'use client';
import { Logo } from '@/components/atoms/Logo';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useToast } from '@/hooks/toast';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('danielhernandez@gmail.com');
  const [password, setPassword] = useState('12345');

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (res?.error !== null) {
      toast(res?.error || 'Error al iniciar sesión, intente de nuevo', 'Error', 'error');
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <div className='flex min-h-screen'>
        {/* <div className='flex h-screen w-full flex-col justify-between lg:w-1/2'> */}
        <div className='flex h-screen w-full flex-col justify-between'>
          <div className='p-4'>{/* <Logo width={104} heigth={53} /> */}</div>

          <div className='flex flex-col items-center gap-10 px-3 sm:mb-10'>
            <div className='text-center'>
              {/* <h1 className='font-regular text-5xl sm:text-6xl'>Iniciar sesión</h1> */}
              <div className='flex justify-center'>
                <Logo width={150} heigth={76} />
              </div>
              <p className='mt-3 text-gray-400'>Bienvenido al sistema de KGD</p>
            </div>
            <div className='mx-auto max-w-form md:min-w-[450px] rounded-xl  first-line:border-blue-200'>
              <form
                className='w-full'
                onSubmit={onSubmit}
                // method='POST'
                // action={process.env.NEXT_PUBLIC_API_URL + '/autenticacion/validar'}
              >
                <div className='mb-4'>
                  <label htmlFor='email' className='block text-gray-700 text-sm font-bold mb-2'>
                    Correo electrónico
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    // className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    className='border-solid border-2 px-3 py-1 pb-2 rounded-md w-full'
                    placeholder='ejemplo@correo.com'
                    required
                    autoFocus
                    // value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-6'>
                  <label htmlFor='password' className='block text-gray-700 text-sm font-bold mb-2'>
                    Contraseña
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    // className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
                    className='border-solid border-2 px-3 py-1 pb-2 rounded-md w-full'
                    placeholder='******************'
                    required
                    // value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='flex items-center justify-between flex-wrap gap-4'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'
                    type='submit'
                  >
                    Iniciar sesión
                  </button>
                  <a
                    className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                    href='#'
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            </div>
            {/* <button
              onClick={() =>
                signIn('google', {
                  callbackUrl: '/'
                })
              }
              className='flex items-center gap-8 rounded-xl border-2 border-gray-200 px-8 py-3 transition-transform hover:-translate-y-1 sm:px-10 sm:py-4'
            >
              <Image
                src={logoGoogle}
                alt='Logo Google'
                width={50}
                height={51}
                priority={true}
                className='w-auto h-auto'
              />
              <p className='sm:text-1xl text-xl font-semibold text-gray-400'>Ingresa con Google</p>
            </button> */}
          </div>

          <footer className='flex h-20 items-center justify-center border-t-2 border-gray-200'>
            <p>© KGD {new Date().getFullYear()}</p>
          </footer>
        </div>

        {/* <div className='bg-login h-screen lg:w-1/2'></div> */}
      </div>
    </>
  );
}

// SignIn.auth = false;
