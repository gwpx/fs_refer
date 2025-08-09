import NextAuth from "next-auth";
import LinkedIn from "next-auth/providers/linkedin";

const handler = NextAuth({
  providers: [
    LinkedIn({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope: "r_liteprofile r_emailaddress",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
