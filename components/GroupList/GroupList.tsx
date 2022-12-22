import { Group } from "graphql/types";
import { Card, ListItem } from "components";
import Link from "next/link";

export type GroupListProps = { groups: Group[] };

export default ({ groups }: GroupListProps) => {
  if (groups.length === 0) return null;
  return (
    <>
      <div className="flex flex-col">
        {groups.map(({ name, id }) => {
          return (
            <Link href={`/g/${id}`} className="no-underline group">
              <ListItem
                Header={
                  <h2 className="text-xl group-hover:underline">{name}</h2>
                }
                key={id}
                itemClassName="group-focus:ring-2 group-focus:ring-black group-hover:dark:border-stone-500"
              >
                12 Members
              </ListItem>
            </Link>
          );
        })}
      </div>
    </>
  );
};
