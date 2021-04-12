import React from "react";
import Color from "../../../Constants/Color";
import IconName from "../../../Constants/IconName";
import IconHandler from "../../UI/Icon/IconHandler";

const DeleteChangerSchudle = ({ handler }) => (
  <IconHandler handler={handler} color={Color.crimson} size={24}  name={IconName.fontAwesome.close} />
);

export default DeleteChangerSchudle;
