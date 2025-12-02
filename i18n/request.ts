import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headersList = await headers();

  let locale = cookieStore.get("NEXT_LOCALE")?.value as Locale | undefined;

  if (!locale) {
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage) {
      const browserLocale = acceptLanguage.split(",")[0].split("-")[0];
      if (locales.includes(browserLocale as Locale)) {
        locale = browserLocale as Locale;
      }
    }
  }

  if (!locale || !locales.includes(locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
