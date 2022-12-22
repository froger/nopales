import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema.graphql",
  documents: ["./graphql/client/**/*.graphql"],
  generates: {
    "./lib/client/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
    "./graphql/types.ts": {
      config: {
        useIndexSignature: true,
        mappers: {
          User: ".prisma/client#User as UserModel",
          Group: ".prisma/client#Group as GroupModel",
          GroupContributor:
            ".prisma/client#GroupContributor as GroupContributorModel",
        },
      },
      plugins: ["typescript", "typescript-operations", "typescript-resolvers"],
    },
  },
};
export default config;
