import PropTypes from 'prop-types';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, webformatURL, openModal }) => {
  return (
    <GalleryItem key={id} onClick={() => openModal(id)}>
      <GalleryItemImage src={webformatURL} alt="image" />
    </GalleryItem>
  );
};
export default ImageGalleryItem;
