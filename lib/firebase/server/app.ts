import { initializeApp } from "firebase-admin/app";

import { Auth, getAuth } from "firebase-admin/auth";

class AuthService {
  private static instance: AuthService;
  private expiresIn = 60 * 60 * 24 * 1 * 1000; // day
  public auth: Auth;
  private constructor() {
    const app = initializeApp({
      projectId: "tannin-production",
    });

    const auth = getAuth(app);

    this.auth = auth;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async createSessionCookie(
    idToken: string
  ): Promise<{ session: string; maxAge: number }> {
    const session = await this.auth.createSessionCookie(idToken, {
      expiresIn: this.expiresIn,
    });

    return {
      session,
      maxAge: this.expiresIn,
    };
  }

  public async verifyToken(token: string) {
    return await this.auth.verifyIdToken(token, true);
  }
}

export const authService = AuthService.getInstance();
