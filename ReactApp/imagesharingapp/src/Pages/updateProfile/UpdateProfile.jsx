import "./UpdateProfile.scss"
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {
    useMutation,
    useQueryClient,
} from 'react-query'
import {makeRequest} from "../../axios";

const UpdateProfile = () => {
    const [file,setFile] = useState(null)
    const [email,setEmail] = useState("")


    const upload = async () => {
        try {
            const formData = new FormData()
            formData.append("file",file)
            const res = await makeRequest.post("/upload",formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    const {currentUser} = useContext(AuthContext)
    //from react query docs used to auto refreash post page when we add new post
    const queryClient = useQueryClient()

    const mutation = useMutation((newPost) => {
        return makeRequest.post("/posts",newPost)
    },{

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries(['posts'])
        },
    })

    const handleClick = async (event) => {
        event.preventDefault()
        let imgUrl = ""

        if(file) imgUrl = await upload()
        mutation.mutate({email:email,img:imgUrl})
        setEmail("")
        setFile(null)


    }


    return (

        <div className="createpost">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img
                            src={currentUser.profilePic}
                            alt=""
                        />
                        <input type="text" placeholder={`Enter your new Email Address: `}
                               onChange={(event) => setEmail(event.target.value)}
                               value={email}
                        />
                    </div>
                    <div className="right">
                        {file && <img className="file" alt="" src={URL.createObjectURL(file)}/>}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input type="file" id="file" style={{display:"none"}}
                               onChange={(event) => setFile(event.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add profile picture</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">

                        <button onClick={handleClick}>Update</button>

                    </div>
                </div>

            </div>

        </div>

    );

};
export default UpdateProfile