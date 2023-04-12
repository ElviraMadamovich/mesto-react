import React from "react";
import Card from "./Card";
import { api } from "../utils/Api";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [name, setUserName] = React.useState('');
  const [work, setUserWork] = React.useState('');
  const [avatar, setUserAvatar] = React.useState('');
  const [elements, setItem] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, element]) => {
        setUserName(user.name);
        setUserWork(user.about);
        setUserAvatar(user.avatar);
        setItem(element);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  return (
    <main>
      <section className="profile">
        <button className="profile__button-avatar" type="button" onClick={onEditAvatar}></button>
        <img className="profile__image" src={avatar} alt="Аватар" />
        <div className="profile__author">
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button type="button" className="profile__edit" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle">{work}</p>
        </div>
        <button type="button" className="profile__button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements__pics">
          {elements.map(element => {
            return (
              <Card
                key={element._id}
                element={element}
                onCardClick={onCardClick}
                name={element.name}
                link={element.link}
              />
            )
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;