import { ReactNode } from "react";

export type CardProps = React.PropsWithChildren<{
  Header?: ReactNode;
  Footer?: ReactNode;
  id?: string;
  cardClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}>;

export default ({
  Header,
  Footer,
  children,
  id,
  cardClassName = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}: CardProps) => (
  <article
    className={`max-w-sm container border-solid dark:border-stone-800 border-stone-400 border-2 shadow-lg flex flex-col ${cardClassName}`}
    id={id}
  >
    {Header && (
      <header className={`px-6 pt-6 pb-2 block text-center ${headerClassName}`}>
        {Header}
      </header>
    )}
    <div className={`px-6 py-4 ${bodyClassName}`}>{children}</div>
    {Footer && (
      <footer
        className={`pb-4 px-6 flex justify-end items-center ${footerClassName}`}
      >
        {Footer}
      </footer>
    )}
  </article>
);
