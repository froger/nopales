import { GroupForm, GroupList, PlainLayout } from "components";
import { useMyGroupsQuery } from "lib/client";
import { Group } from "graphql/types";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useMemo } from "react";
export type DashboardPageProps = {};
const DashboardPage = ({}: DashboardPageProps) => {
  const { data: groupData } = useMyGroupsQuery({ variables: {} });
  const groups = useMemo(() => groupData?.groups || [], [groupData]) as Group[];
  return (
    <PlainLayout>
      <div className="flex gap-6 flex-col flex-wrap">
        <div className="leading-snug">
          <h2 className="text-2xl">Your groups</h2>
          <p className="text-lg">They may be wired but love you</p>
        </div>
        <GroupForm />
        <GroupList groups={groups} />
      </div>
    </PlainLayout>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps<
  DashboardPageProps
> = async ({ req }) => {
  const token = await getToken({ req });
  if (!token?.email) {
    throw new Error("401 Unauthorized");
  }

  return {
    props: {},
  };
};
