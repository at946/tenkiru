/* eslint-disable no-unused-vars */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_GA_ID?: string;
      NEXT_PUBLIC_GOOGLE_ADSENSE_ID?: string;
    }
  }
}

export {};
