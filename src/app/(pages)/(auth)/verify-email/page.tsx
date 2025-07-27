import { Suspense } from "react";
import VerifyEmailWrapper from "./VerifyEmailWrapper";

export default async function Page(props: {
  searchParams?: Promise<{
    token?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const token = searchParams?.token ?? "";

  return (
    <Suspense>
      <VerifyEmailWrapper token={token} />
    </Suspense>
  );
}
