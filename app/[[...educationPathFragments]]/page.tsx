import Header from "../Header";
import { buildParams } from "../helpers";

export default async function Page({
  params,
  searchParams,
}: {
  params: { educationPathFragments: string[] };
  searchParams: Record<string, string>;
}) {
  const urlSearchParams = buildParams({
    ...searchParams,
    headless: "true",
  });

  const path = params.educationPathFragments?.join("/") || "";
  const url = `https://widgets-poc.northpass.com/${path}?${urlSearchParams}`;

  const response = await fetch(url, {
    headers: {
      Cookie: process.env.COOKIE!,
    },
  }).then((res) => res.text());

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
