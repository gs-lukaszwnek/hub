export const getResponse = async () => {
  const url =
    "http://learner.lvh.me:3000/learning/api/v1/widgets/public_courses";

  return fetch(url, {
    headers: {
      "x-ce-school-id": "37696343-1e0c-4834-96de-0013b95789c2",
    },
    next: { revalidate: 0 },
  }).then((res) => res.text());
};
