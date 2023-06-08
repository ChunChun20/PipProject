import "./createpost.scss"
import {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import {
    useMutation,
    useQueryClient,
} from 'react-query'
import {makeRequest} from "../../axios";

import {Navigate} from "react-router-dom";
import addImage from "../../assets/add-image.png"
import uploadImage from "../../assets/upload.png"








const CreatePost = () => {
    const [file,setFile] = useState(null)
    const [desc,setDesc] = useState("")


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
        let name = currentUser.name
        if(file) imgUrl = await upload()
        mutation.mutate({desc,img:imgUrl,name:name})
        setDesc("")
        setFile(null)


    }
    
  // Check if file is selected
  const isFileSelected = file !== null;

    return (

        <div className="createpost">
            <div className="container">
                <div className="top">
                    <div className="left">
                    <img
                        src={currentUser.profilePic}
                        alt=""
                    />
                    <input type="text" placeholder={`Write something nice about your photo, ${currentUser.name}!`}
                           onChange={(event) => setDesc(event.target.value)}
                           value={desc}
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
                            <img class='addImage' src={addImage} alt="upload iamge" />
                                <img src={Image} alt="" />
                                <span> &nbsp; &nbsp;Add Image</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                    <img class='uploadImage' src={uploadImage} alt="upload image" onClick={handleClick} disabled={!isFileSelected}/>

                    {/* <button onClick={handleClick} disabled={!isFileSelected}>Upload</button> */}

                    </div>
                </div>

            </div>

        </div>

    );

};
export default CreatePost