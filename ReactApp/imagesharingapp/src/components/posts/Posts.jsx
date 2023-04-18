import "./posts.scss"
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import UserPost from "../post/UserPost";

const Posts = () => {
    const { currentUser } = useContext(AuthContext);

    const posts = [
        {
            id:1,
            name:"Johny sins",
            userId:1,
            profilePic: currentUser.profilePic,
            desc:"Doctor",
            img: currentUser.profilePic

        },
        {
            id:2,
            name:"Jojo sins",
            userId:2,
            profilePic: currentUser.profilePic,
            desc:"Dentist",
            img: currentUser.profilePic

        },
        {
            id:3,
            name:"Joel sins",
            userId:4,
            profilePic: currentUser.profilePic,
            desc:"Pizza delivery guy",
            img: currentUser.profilePic

        },
        {
            id:4,
            name:"Jo sins",
            userId:4,
            profilePic: currentUser.profilePic,
            desc:"Teacher",
            img: currentUser.profilePic

        },
        {
            id:5,
            name:"Jamal sins",
            userId:5,
            profilePic: currentUser.profilePic,
            desc:"Karate master",
            img: currentUser.profilePic

        },
    ]


    return <div className="posts">
        {
            posts.map(post=>(
                <div className='userpost'>
               <UserPost post={post} key={post.id}/>
                </div>
            ))}
    </div>
}

export default Posts