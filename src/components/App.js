import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/Api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cardToBeDeleted, setToBeDeleted] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([user, card]) => {
        setCurrentUser(user)
        setCards(card);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDelete(card) {
    setToBeDeleted(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setToBeDeleted(null);
  }

  function handleAmendUser(userInfo) {
    api
      .updateDetails(userInfo)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAmendAvatar({ avatar }) {
    api
      .changeUserAvatar(avatar)
      .then((newUserInfo) => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleAddPlace({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        closeAllPopups();
      })
      .catch(console.error);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleLike(card) {
    const isLiked = card.likes.some((person) => person._id === currentUser._id);
    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error);
  }

  function handleConfirmCardDelete() {
    const cardId = cardToBeDeleted._id;
    api
      .deleteUserCard(cardId)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onLikeButtonClick={handleLike}
          onDeleteButtonClick={handleDelete}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAmendAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleAmendUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <ConfirmationPopup
          isOpen={!!cardToBeDeleted}
          onClose={closeAllPopups}
          onConfirm={handleConfirmCardDelete}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
