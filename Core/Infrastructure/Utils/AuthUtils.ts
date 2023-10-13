import * as jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthUtils {
  public static async generateToken(
    userLogin: string,
    userCode: string,
    thirdCode: string
  ): Promise<{ internalToken: string }> {
    const privateKey: string | undefined = process.env.SECRET_KEY_JWT_API;

    if (privateKey != null) {
      const internalToken = jwt.sign(
        {
          email: userLogin,
          userId: userCode,
          thirdId: thirdCode
        },
        privateKey,
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      return { internalToken };
    } else {
      const internalToken = '';
      return { internalToken };
    }
  }
}
