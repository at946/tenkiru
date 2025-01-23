import { routing, type TLocales } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as TLocales)) {
    locale = routing.defaultLocale;
  }
  
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})