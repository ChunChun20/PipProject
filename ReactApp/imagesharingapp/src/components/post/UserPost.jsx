import "./post.scss"

const UserPost = ({post}) =>{
    return (
        <div className='post'>
            <div className="container">
            <div className="content">
                <p>{post.desc}</p>
                <img src={post.img} alt=""/>
            </div>
            </div>
        </div>
    )
}

export default UserPost