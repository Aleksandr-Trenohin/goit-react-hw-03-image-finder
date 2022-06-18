import { Component } from 'react';

import { AppContainer, AppTitle } from './App.styled';

import Searhbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getImages } from '../services/Api';

export class App extends Component {
  state = {
    images: [],
    title: '',

    activePage: 1,
    totalHits: 0,

    status: 'idle',
    // isLoading: false,

    isModalOpen: false,
    modalItem: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { activePage, title } = this.state;

    const prevPage = prevState.activePage;
    const prevTitle = prevState.title;
    const newTitle = title;

    if (prevTitle !== newTitle) {
      this.setState({
        status: 'pending',
        // isLoading: true,
        images: [],
        activePage: 1,
      });
      this.fetchImages();
    }

    if (activePage !== prevPage && activePage !== 1) {
      this.setState({
        // isLoading: true,
        status: 'pending',
      });
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { title, activePage } = this.state;

    try {
      const { hits, totalHits } = await getImages(title, activePage);
      console.log(hits, totalHits);

      if (hits.length === 0) {
        this.setState({
          status: 'idle',
          // isLoading: false,
        });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: 'resolved',
        // isLoading: false,
        totalHits,
      }));
    } catch (error) {
      this.setState({
        status: 'rejected',
        // isLoading: false,
      });
    } finally {
    }
  };

  imageTitle = title => {
    if (this.state.title !== title) {
      this.setState({
        title: title,
        activePage: 1,
      });
    }
  };

  nextPage = () => {
    this.setState(prevState => ({
      activePage: prevState.activePage + 1,
    }));
  };

  showModalWindow = id => {
    const { images } = this.state;
    const currentItem = images.find(item => item.id === id);

    this.setState({ modalItem: currentItem });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));
  };

  render() {
    const {
      images,
      title,

      status,
      // isLoading,

      totalHits,
      activePage,

      isModalOpen,
      modalItem,
    } = this.state;
    const { imageTitle, nextPage, toggleModal, showModalWindow } = this;

    return (
      <AppContainer>
        <Searhbar onSubmit={imageTitle} />
        {status === 'rejected' && (
          <AppTitle>Oop! Something went wrong! Try again later!</AppTitle>
        )}

        {/* {isLoading ? (
          <Loader />
        ) : (
          <ImageGallery
            // images={images} onClick={openFullPicture} />
            images={images}
            onOpenModal={showModalWindow}
          />
        )} */}
        <ImageGallery images={images} onOpenModal={showModalWindow} />
        {status === 'idle' && (
          <AppTitle>Welcome to the world of images!</AppTitle>
        )}

        {status === 'pending' && <Loader />}
        {status === 'resolved' && images.length === 0 && (
          <AppTitle>'Such {title}' not found!</AppTitle>
        )}

        {totalHits > activePage * 12 && <Button nextPage={nextPage} />}

        {isModalOpen && <Modal onOpen={modalItem} onClose={toggleModal} />}
      </AppContainer>
    );
  }
}
