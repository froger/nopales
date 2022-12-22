import { GetStaticPaths, GetStaticProps } from "next";

export type PublicProps = { agreements: string[] };
const Public = (props: PublicProps) => {};
export default Public;

export const revalidate = 3600;
export const getStaticProps: GetStaticProps<PublicProps> = async () => {
  return {
    agreements: ["a"],
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return ["g/public"];
};
