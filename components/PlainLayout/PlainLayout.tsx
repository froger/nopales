import { Group } from "@prisma/client";
import { PrimaryButton } from "components";
import { PrimaryButtonProps } from "components/Button/Primary/Primary";

export type PlainLayoutProps = React.PropsWithChildren<{
  group?: Group;
}>;
const NavLink = ({
  href,
  children,
}: Pick<PrimaryButtonProps, "href" | "children">) => (
  <PrimaryButton
    className="px-3 pt-8 inline-block border-transparent border-b-2 focus:ring-black focus:ring-2 hover:underline"
    activeClassName="px-3 pt-8 border-b-yellow-400"
    href={href}
  >
    {children}
  </PrimaryButton>
);

const PlainLayout = ({ children, group }: PlainLayoutProps) => {
  return (
    <main className="min-h-screen bg-zinc-200 dark:bg-zinc-900 pb-48">
      <header className="flex flex-col sm:flex-row px-6 pt-6 bg-emerald-900	text-white	">
        <div className="w-1/5">
          <NavLink href="/dashboard">nopales</NavLink>
        </div>
        {group && (
          <nav className="w-4/5 sm:w-full mt-4 md:mt-0 block">
            <ul className="flex flex-row gap-6">
              <li>
                <NavLink href="/drafts">drafts</NavLink>
              </li>
              <li>
                <NavLink href="/proposals">proposals</NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
      {children && (
        <div className="prose container px-6 mx-auto pt-12 md:pt-6">
          {children}
        </div>
      )}
    </main>
  );
};

export default PlainLayout;
