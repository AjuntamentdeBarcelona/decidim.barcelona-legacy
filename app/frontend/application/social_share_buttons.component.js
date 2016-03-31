import { 
  ShareButtons, 
  ShareCounts, 
  generateShareIcon 
} from 'react-share';

const { 
  FacebookShareButton, 
  GooglePlusShareButton, 
  TwitterShareButton 
} = ShareButtons;

const FacebookIcon   = generateShareIcon('facebook');
const TwitterIcon    = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');

export default ({
  title,
  url
}) => (
  <div className="share-supported">
    <div className="share-buttons">
      <TwitterShareButton title={`${title} #DecidimBarcelona`} url={url}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
      <FacebookShareButton title={title} url={url}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <GooglePlusShareButton url={url}>
        <GooglePlusIcon size={32} round={true} />
      </GooglePlusShareButton>
    </div>
  </div>
)
