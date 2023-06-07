import "./post.scss"
import moment from "moment"


const UserOwnPost = ({post}) =>{
    return (
        <div className='post'>
            <div className="container">
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"http://localhost:3000/" + post.img} alt=""/>
                    <div className="date">{moment(post.date).fromNow()}</div>
                </div>

            </div>
        </div>
    )
}

export default UserOwnPost