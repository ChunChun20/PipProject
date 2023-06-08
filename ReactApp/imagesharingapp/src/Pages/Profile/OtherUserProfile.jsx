import { makeRequest } from "../../axios";
import "./profile.scss";
import UserOwnPost from "../../components/post/UserOwnPost";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {useParams} from "react-router-dom";

const OtherUserProfile = () => {
    const { username } = useParams();
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    const userName = user.name
    console.log("userID",userId)
    console.log("username: ",username)

    const { isLoading, error, data } = useQuery("posts", () =>
        makeRequest.get("/posts").then((res) => res.data)
    );
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (postId) => {
            console.log("IT works")
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            }
        }
    );

    const handleDelete = async (postId) => {
        deleteMutation.mutate(postId);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const userPosts = data.filter((post) => post.username === username);

    return (
        <div className="posts">
            {userPosts.length === 0 ? (
                <div>No posts found for user {username}</div>
            ) : (
                userPosts.map((post) => (
                    <div key={post.id}>

                        <UserOwnPost key={post.id} post={post} />

                        { username === userName && (
                        <div>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                        )}

                </div>
                ))
            )}
        </div>
    );
};

export default OtherUserProfile;