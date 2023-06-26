import { useRouter } from "next/router";

function useLocale() {
  const router = useRouter();
  return {
    current: router?.locale,
    locales: router?.locales,
    isLocale: router?.isLocaleDomain,
    domain: router?.domainLocales,
    default: router?.defaultLocale,
  };
}

export default useLocale;
