import { img_300, unavailable } from '../../config/config';
import ContentModal from '../ContentModal/ContentModal';
import { Badge } from '@material-ui/core';
import './SingleContent.css';

const SingleContent = ({ id, title, media_type, poster_path, release_date, vote }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
      <Badge badgeContent={vote} color={vote > 6 ? 'primary' : 'secondary'}/>
      <img
        className="poster"
        src={poster_path ? `${img_300}/${poster_path}` : unavailable}
        alt={title}
      />
      <b className='title'>{title}</b>
      <span className='subTitle'>
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{release_date}</span>
      </span>
    </ContentModal>
  )
}

export default SingleContent