import type { FC } from "react";

interface INotFoundProps {
  className?: string;
}

const NotFound: FC<INotFoundProps> = (props) => {
  return <div>404 Not Found</div>;
};

export default NotFound;
