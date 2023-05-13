import "./post.scss"
import moment from "moment"

const UserPost = ({post}) =>{
    return (
        <div className='post'>
            <div className="container">
            <div className="content">
                    <p>{post.desc}</p>
                    <img src={post.img} alt=""/>
                <div className="date">{moment(post.date).fromNow()}</div>
                </div>

            </div>
        </div>
    )
}

export default UserPost