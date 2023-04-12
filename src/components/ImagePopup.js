import React from "react";

function ImagePopup({
  element,
  onClose }) {

  return (

    <section className={`popup image-popup ${element.link ? 'popup_opened' : ''}`}>
      <div className="image-popup__container">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="image-popup__pic" src={element ? element.link : ''} alt={element.name} />
        <h2 className="image-popup__name">{element.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
