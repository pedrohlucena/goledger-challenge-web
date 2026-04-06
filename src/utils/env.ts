export const env = {
  backend: {
    apiUrl: process.env.BACKEND_API_URL as string,
    loginUsername: process.env.BACKEND_LOGIN_USERNAME as string,
    loginPassword: process.env.BACKEND_LOGIN_PASSWORD as string,
  },
  auth: {
    sessionSecret: process.env.SESSION_SECRET as string,
  },
};
