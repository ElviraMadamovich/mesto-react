import { useEffect, useState } from "react";
import Card from "./Card";
import { api } from "../utils/Api";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [name, setUserName] = useState('');
  const [work, setUserWork] = useState('');
  const [avatar, setUserAvatar] = useState('');
  const [elements, setItem] = useState([]);

  useEffect(() => {
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
        <button onClick={onEditAvatar} className="profile__button-avatar" name="avatar-button" aria-label="avatar-button" type="button"></button>
        <img className="profile__image" src={avatar} alt="Аватар" />
        <div className="profile__author">
          <div className="profile__name">
            <h1 className="profile__title">{name}</h1>
            <button onClick={onEditProfile} type="button" className="profile__edit" name="edit-button" aria-label="edit-button"></button>
          </div>
          <p className="profile__subtitle">{work}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="profile__button" name="card-button" aria-label="card-button"></button>
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