import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { apolloClient } from "lib/client";
import { gql } from "@apollo/client";

export type GroupProps = {};
export default ({}: GroupProps) => {
  return "SIGNED IN";
};
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const token = await getToken({ req });
  const groupId = await apolloClient.query({
    query: gql`
        groups {
          name
          id
          contributors {
            user {
              name
            }
          }
        }
    `,
  });
  const isUserSignedIn = !!token && !!token.email;
  if (!isUserSignedIn)
    return {
      redirect: { destination: "/public", statusCode: 301 },
    };
  return { props: {} };
};
