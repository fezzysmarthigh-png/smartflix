import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
//   pages: {
//     signIn: "/sign-in",
//   },
//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return baseUrl; // Automatically brings the user back to home ("/") after sign-in
//     },
//     // async session({ session, token }) {
//     //   if (session.user && token.sub) {
//     //     session.user.id = token.sub;
//     //   }
//     //   return session;
//     // },
//   },

  // adapter: FirestoreAdapter({
  //     credential: cert({
  //       projectId: process.env.AUTH_FIREBASE_PROJECT_ID,
  //       clientEmail: process.env.AUTH_FIREBASE_CLIENT_EMAIL,
  //       privateKey: process.env.AUTH_FIREBASE_PRIVATE_KEY,
  //     }),
  //   }),

});
