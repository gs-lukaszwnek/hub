import { redirect } from "next/navigation";
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
  const url = `${process.env.INSTANCE_URL!}/${path}?${urlSearchParams}`;

  const response = await fetch(url, {
    headers: {
      Cookie: process.env.COOKIE!,
    },
    redirect: "manual",
  }).then((res) => {
    if (res.headers.get("location")) {
      const redirectUrl = res.headers
        .get("location")!
        .replace(process.env.INSTANCE_URL!, "");
      redirect(redirectUrl);
    }
    return res.text();
  });

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
