import { readFileSync } from "node:fs";
export const typeDefs = readFileSync("graphql/schema.graphql", "utf-8");
