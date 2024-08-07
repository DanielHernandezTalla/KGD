import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handle = NextAuth({
    providers: [GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code"
            }
        }
    })],
    pages: {
        signIn: '/auth/signin'
    },
    /*callbacks: {
        signIn: async ({user, account}) => {
            // Verifica si el usuario tiene permitido iniciar sesión
            const allowedUsers = ["publ.andres@gmail.com"];
            if (!allowedUsers.includes(user.email || "")) {
            return Promise.resolve(false);
            }

            return Promise.resolve(true);
        },
    },*/
})

export { handle as GET, handle as POST }