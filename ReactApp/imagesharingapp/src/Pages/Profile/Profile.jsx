import { makeRequest } from "../../axios";
import "./profile.scss";
import UserPost from "../../components/post/UserPost";
import { useQuery,useQueryClient } from "react-query";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    const { isLoading, error, data } = useQuery("posts", () =>
        makeRequest.get("/posts").then((res) => res.data)
    );
    const queryClient = useQueryClient();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const userPosts = data.filter((post) => post.userId === parseInt(userId));


    const handleDelete = async (postId) => {
        try {
            await makeRequest.delete(`/posts`);
            // Refresh the posts after successful deletion
            // You can use the invalidateQueries function from react-query to update the query
            await queryClient.invalidateQueries("posts");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="posts">
            {userPosts.length === 0 ? (
                <div>No posts found for user {userId}</div>
            ) : (
                userPosts.map((post) => (
                    <div key={post.id}>
                        <UserPost post={post} />
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
