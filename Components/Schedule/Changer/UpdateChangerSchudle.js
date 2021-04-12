import React from "react";
import Color from "../../../Constants/Color";
import IconName from "../../../Constants/IconName";
import IconHandler from "../../UI/Icon/IconHandler";

const UpdateChangerSchudle = ({ handler }) => (
  <IconHandler handler={handler} color={Color.forestgreen} size={24}  name={IconName.fontAwesome.pencilSquareO} />
);

export default UpdateChangerSchudle;
