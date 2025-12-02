import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="flex min-h-screen items-center justify-center pt-16">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-4 text-muted">{t("subtitle")}</p>
      </div>
    </div>
  );
}
