import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Contributor = {
  __typename?: "Contributor";
  createdAt?: Maybe<Scalars["String"]>;
  groupId?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Group = {
  __typename?: "Group";
  contributors?: Maybe<Array<Maybe<Contributor>>>;
  createdAt?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type GroupInput = {
  name: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createGroup: Group;
  deleteGroup: Group;
  updateGroup: Group;
};

export type MutationCreateGroupArgs = {
  data: GroupInput;
};

export type MutationDeleteGroupArgs = {
  id: Scalars["ID"];
};

export type MutationUpdateGroupArgs = {
  data: GroupInput;
  id: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  group: Group;
  groups: Array<Maybe<Group>>;
};

export type QueryGroupArgs = {
  id: Scalars["ID"];
};

export type User = {
  __typename?: "User";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type MyGroupsQueryVariables = Exact<{ [key: string]: never }>;

export type MyGroupsQuery = {
  __typename?: "Query";
  groups: Array<{
    __typename?: "Group";
    name?: string | null;
    id?: string | null;
    contributors?: Array<{
      __typename?: "Contributor";
      user?: { __typename?: "User"; name?: string | null } | null;
    } | null> | null;
  } | null>;
};

export const MyGroupsDocument = gql`
  query myGroups {
    groups {
      name
      id
      contributors {
        user {
          name
        }
      }
    }
  }
`;

/**
 * __useMyGroupsQuery__
 *
 * To run a query within a React component, call `useMyGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<MyGroupsQuery, MyGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MyGroupsQuery, MyGroupsQueryVariables>(
    MyGroupsDocument,
    options
  );
}
export function useMyGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MyGroupsQuery,
    MyGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MyGroupsQuery, MyGroupsQueryVariables>(
    MyGroupsDocument,
    options
  );
}
export type MyGroupsQueryHookResult = ReturnType<typeof useMyGroupsQuery>;
export type MyGroupsLazyQueryHookResult = ReturnType<
  typeof useMyGroupsLazyQuery
>;
export type MyGroupsQueryResult = Apollo.QueryResult<
  MyGroupsQuery,
  MyGroupsQueryVariables
>;
