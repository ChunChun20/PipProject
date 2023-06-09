import "./post.scss"
import moment from "moment"
import pin from '../../assets/pin1.png'


const UserOwnPost = ({post}) =>{
    return (
        <div className='post'>
            <div className="container">
                <img className='pin' src={pin} alt="pin" />
                <div className="content">

                    <img src={"http://localhost:3000/" + post.img} alt="test"/>
                    <p>{post.username}: {post.desc}</p>

                    <div className="date">{moment(post.date).fromNow()}</div>
                </div>

            </div>
        </div>
    )
}



export default UserOwnPost