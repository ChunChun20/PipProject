import express from "express";
const app = express()
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer";


//MIDDLEWARES
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Credentials",true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    methods: ["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(cookieParser())


//from multer docs
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../imagesharingapp/public')
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.post("/api/upload",upload.single("file"),(req,res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)



app.listen(8080, ()=> {
    console.log("Working!")
})