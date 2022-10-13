import React from "react";
import { Images } from "../data/constants";

function Footer(props) {
  return (
    <footer>
      <img src={Images.LOGO} alt="" />
      <span>
        Made with ❤ and <b>React.js</b>.
      </span>
    </footer>
  );
}

export default Footer;
