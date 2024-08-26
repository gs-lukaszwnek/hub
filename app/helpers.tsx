import { redirect } from "next/navigation";
import type { PageProps } from "./types";

const buildParams = (data: object) => {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((value) => params.append(key, value.toString()));
    } else {
      params.append(key, value.toString());
    }
  });

  return params.toString();
};

export const getResponse = async ({ searchParams, params }: PageProps) => {
  const urlSearchParams = buildParams({
    ...searchParams,
    headless: "true",
  });

  const path = params.educationPathFragments?.join("/") || "";
  const url = `${process.env.INSTANCE_URL!}/${path}?${urlSearchParams}`;

  return fetch(url, {
    headers: {
      Cookie: process.env.COOKIE!,
    },
    redirect: "manual",
    next: { revalidate: 0 },
  }).then((res) => {
    const location = res.headers.get("location");
    if (location) {
      const redirectUrl = location.replace(process.env.INSTANCE_URL!, "");
      redirect(redirectUrl);
    }
    return res.text();
  });
};
