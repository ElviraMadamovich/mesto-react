import React from "react";

function Card({
  element,
  onCardClick,
  name,
  link,
  onCardLike,
  onDeleteButtonClick }) {

  const handleCardClick = () => {
    onCardClick(element);
  }

  function handleLikeButtonClick() {
    onCardLike(element);
  }

  function handleDeleteButtonClick() {
    onDeleteButtonClick(element);
  }

  return (
    <li className="elements__pic">
      <button type="button" onClick={handleDeleteButtonClick} className="elements__delete"></button>
      <img className="elements__image" src={link} alt={name} onClick={handleCardClick} />
      <div className="elements__title">
        <h2 className="elements__name">{element.name}</h2>
        <div className="elements__likes">
          <button type="button" onClick={handleLikeButtonClick} className="elements__like"></button>
          <p className="elements__likes-qty">{element.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
