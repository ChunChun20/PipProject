import "./posts.scss"
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";
import UserPost from "../post/UserPost";
import {  useQuery } from 'react-query'
import {makeRequest} from "../../axios";

const Posts = () => {
    // const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery('posts', () =>

        makeRequest.get("/posts").then(res=>{
            return res.data
            })

    )

    console.log(data)



    //load the posts
    return <div className="posts">
        {error ? "Something went wrong!" : (isLoading ? "loading" : data.map((post)=> <UserPost post={post} key={post.id}/>))}
    </div>
}

export default Posts