import Button from "../Button";
import { BiLeftArrow } from "react-icons/bi";
import { BiRightArrow } from "react-icons/bi";

export default function ButtonGroup() {
  return (
    <div>
      <Button icon={<BiLeftArrow />}>Retroceder</Button>
      <Button icon={<BiRightArrow />}>Avançar</Button>
    </div>
  );
}
