import { getResponse } from "../helpers";

export default async function Page() {
  const response = await getResponse();

  return (
    <div
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: response }}
    />
  );
}
