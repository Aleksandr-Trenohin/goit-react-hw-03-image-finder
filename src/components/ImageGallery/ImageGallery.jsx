import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, onOpenModal }) => {
  return (
    <Gallery>
      {/* {images.length === 0 && <p>No images found</p>} */}
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          openModal={onOpenModal}
        />
      ))}
    </Gallery>
  );
};

export default ImageGallery;
