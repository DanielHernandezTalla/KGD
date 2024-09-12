// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'

const authOptions = {
    providers: [
        CredentialsProviders({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: 'Dnaif' },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Credenciales incompletas");
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/autenticacion/validar`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify(credentials)
                    });

                    const data = await res.json();

                    if (!data.lista.id) {
                        throw new Error("Usuario y/o contraseña incorrectos");
                    }

                    return {
                        id: data.lista.id?.toString() || '7',
                        name: data.lista.name,
                        email: data.lista.email || 'danielhernandez@gmail.com',
                        token: data.lista.remember_token
                    };
                } catch (error) {
                    let mensajeError = 'Error desconocido durante la autenticación';

                    if (error instanceof Error) {
                        mensajeError = error.message;
                    } else if (typeof error === 'string') {
                        mensajeError = error;
                    } else if (error && typeof error === 'object' && 'message' in error) {
                        mensajeError = (error as { message: string }).message;
                    }

                    throw new Error(mensajeError);
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signin'
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.token = user.token; // Agregar el token al JWT
            }
            return token;
        },
        async session({ session, token }: any) {
            // Incluye todas las propiedades del token en la sesión
            session.user = {
                id: token.id as string,
                name: token.name as string,
                email: token.email as string,
                token: token.token as string // Incluye el token en la sesión
            };
            return session;
        },
    },
}

const handle = NextAuth(authOptions)

export { handle as GET, handle as POST }
