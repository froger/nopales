import React, { useRef } from "react";
import { useClickAway } from "react-use";

export type ModalType = React.PropsWithChildren<{
  open: boolean;
  onBackdropClick: () => void;
}>;

const Modal = ({ open, children, onBackdropClick }: ModalType) => {
  const ref = useRef(null);
  const child = React.Children.only(children) as any;
  useClickAway(ref, onBackdropClick);
  return (
    <div
      className={`bg-black/50 fade fixed top-0 left-0 ${
        open ? "" : "hidden"
      } w-full h-full outline-none overflow-x-hidden overflow-y-auto`}
      tabIndex={-1}
      aria-hidden={open ? "false" : "true"}
    >
      <div className="relative w-auto pointer-events-none">
        <div className="border-none relative flex flex-col pointer-events-auto bg-clip-padding rounded-md outline-none text-current">
          {React.cloneElement(child, {
            className: `${child.props.className} bg-zinc-200 dark:bg-zinc-900`,
            ref: ref,
          })}
        </div>
      </div>
    </div>
  );
};
export default Modal;
