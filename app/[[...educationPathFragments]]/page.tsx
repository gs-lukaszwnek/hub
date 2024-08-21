import Header from "../Header";
import { getResponse } from "../helpers";
import type { PageProps } from "../types";

export default async function Page({ params, searchParams }: PageProps) {
  const response = await getResponse({ params, searchParams });

  return (
    <>
      <Header />
      <div
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </>
  );
}
