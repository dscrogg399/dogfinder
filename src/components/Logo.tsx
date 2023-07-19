import Row from "./Row";
import dogNose from "../dog-nose.svg";
import dogNoseWhite from "../dog-nose-light.svg";
import { classNames } from "../lib/functions";

// logo component, can be rendered in light or dark mode
export default function Logo({ light }: { light?: boolean }) {
  return (
    <Row className="items-center space-x-4">
      <img src={light ? dogNoseWhite : dogNose} alt="" className="h-32 w-32" />
      <h1
        className={classNames(
          light ? "text-white" : "text-orange-500",
          "text-3xl font-semibold"
        )}
      >
        Pup Quest
      </h1>
    </Row>
  );
}
