import { ReactElement } from "react";

export type ListItemProps = React.PropsWithChildren<{
  Header?: ReactElement;
  Action?: ReactElement;
  itemClassName?: string;
  headerClassName?: string;
  actionClassName?: string;
}>;

const ListItem = ({
  Header,
  headerClassName = "",
  Action,
  actionClassName = "",
  itemClassName = "",
  children,
}: ListItemProps) => (
  <div
    className={`border-2 border-solid min-w-full py-4 focus:ring-black focuse:ring-2 px-2 flex  ${itemClassName}`}
  >
    <div>
      {Header && <div className={`text-lg ${headerClassName}`}>{Header}</div>}
      {children}
    </div>
    {Action && <div className={`py-2 px-2 ${actionClassName}`}>{Action}</div>}
  </div>
);

export default ListItem;
