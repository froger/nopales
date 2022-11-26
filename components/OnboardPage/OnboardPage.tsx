import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import OnboardForm from "./OnboardForm";

export type OnboardPageProps = React.PropsWithChildren<{}>;
const OnboardPage = ({ children }: OnboardPageProps) => {
  const { data: session, status } = useSession();
  if (status === "loading") return <>Loading…</>;
  if (
    status === "authenticated" &&
    !session?.user?.name &&
    session?.user?.email
  )
    return <OnboardForm user={session?.user} />;
  return <>{children}</>;
};

export default OnboardPage;
