import React from "react";
import headerLogo from '../images/Vector.png';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место" />
    </header>
  );
}

export default Header;
