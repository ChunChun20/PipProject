import { makeRequest } from "../../axios";
import "./profile.scss";
import UserOwnPost from "../../components/post/UserOwnPost";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const { isLoading, error, data } = useQuery("posts", () =>
        makeRequest.get("/posts").then((res) => res.data)
    );
    const queryClient = useQueryClient();

    const deleteMutation = useMutation(
        (postId) => {
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

    const userPosts = data.filter((post) => post.userId === parseInt(userId));

    return (
        <div className="posts">
            {userPosts.length === 0 ? (
                <div>No posts found for user {userId}</div>
            ) : (
                userPosts.map((post) => (
                    <div key={post.id}>

                        <UserOwnPost key={post.id} post={post} />
                        <div>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Profile;