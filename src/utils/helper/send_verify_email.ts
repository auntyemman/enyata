import { config } from 'dotenv';
config();

import { emailVerification } from '../emails/senderFunctions/emailVerification';
import { emailVerifyCreateJWT } from '../helper/jwt';
import base64url from 'base64url';

export const sendVerifyEmail = async (
  id: string,
  accountType: string,
  email: string,
  firstName: string,
) => {
  const rawToken = await emailVerifyCreateJWT({
    userId: id,
    accountType: accountType,
    email: email,
  });
  const token = base64url(rawToken);
  const frontendUrl = process.env.FRONTEND_BASE_URL;
  const link: string = `${frontendUrl}/auth/signup/verify-email?token=${token}`;
  return await emailVerification(email, firstName, link);
};
