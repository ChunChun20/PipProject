import "./post.scss"
import moment from "moment"
import pin from '../../assets/pin1.png'
import ShareButton from '../ShareButton/ShareButton'
import likebutton from '../../assets/like.svg'




const UserPost = ({post}) =>{
    return (
        <div className='post'>
          <div className="container">
            <img className='pin' src={pin} alt="pin" />
            <div className="content">
              <img src={post.img} alt="test" />
              <p>{post.desc}</p>
              <span className="date">{moment(post.date).fromNow()}</span>
              <ShareButton />
              <img className='likebutton' src={likebutton} alt="likebutton" />

            </div>
          </div>
        </div>
      );
    };

export default UserPost