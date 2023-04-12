import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleAvatarButtonClick() {
    setAvatarPopupOpen(true);
  }

  function handleEditButtonClick() {
    setProfilePopupOpen(true);
  }

  function handleAddButtonClick() {
    setCardPopupOpen(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false)
    setProfilePopupOpen(false)
    setCardPopupOpen(false)
    setSelectedCard({})
  }

  return (
    <div className='root'>
      <Header />
      <Main
        onEditAvatar={handleAvatarButtonClick}
        onEditProfile={handleEditButtonClick}
        onAddPlace={handleAddButtonClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        title={'Редактировать профиль'}
        isOpen={isProfilePopupOpen}
        name="profile"
        onClose={closeAllPopups}
        buttonDescription={'Сохранить'}>
        <input
          type="text"
          className="popup__content popup__content_input_name"
          id="name"
          name="name"
          placeholder="Имя пользователя"
          required
          minLength={2}
          maxLength={40} />

        <span
          className="popup__error popup__error_active popup__error_name"
          id="name-error" />

        <input type="text"
          className="popup__content popup__content_input_work"
          id="work"
          name="work"
          placeholder="О пользователе"
          required
          minLength={2}
          maxLength={200} />

        <span
          className="popup__error popup__error_active popup__error_work"
          id="work-error" />
      </PopupWithForm>

      <PopupWithForm
        title={'Новое место'}
        isOpen={isCardPopupOpen}
        name="card"
        onClose={closeAllPopups}
        buttonDescription={'Сохранить'}>

        <input
          type="text"
          className="popup__content popup__content_input_title"
          id="caption"
          name="caption"
          placeholder="Название"
          required
          minLength={2}
          maxLength={30} />

        <span
          className="popup__error popup__error_active popup__error_title"
          id="caption-error" />

        <input
          type="url"
          className="popup__content popup__content_input_link"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          required />

        <span
          className="popup__error popup__error_active popup__error_link"
          id="link-error" />
      </PopupWithForm >

      <ImagePopup
        element={selectedCard}
        onClose={closeAllPopups} />

      <PopupWithForm
        title={'Обновить аватар'}
        isOpen={isAvatarPopupOpen}
        name="avatar"
        onClose={closeAllPopups}
        buttonDescription={'Сохранить'}>

        <input
          type="url"
          className="popup__content popup__content_input_avatar"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          required />

        <span
          className="popup__error popup__error_active popup__error_avatar"
          id="avatar-error" />
      </PopupWithForm>

    </div >
  );
}

export default App;
