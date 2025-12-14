import { useContext, useEffect } from "react"
import axios from "axios"
import { GlobalContext } from "../context"
import classes from './styles.module.css'
import { FaTrash, FaEdit } from "react-icons/fa"
import { useNavigate } from "react-router-dom"




export default function Home(){

    const  {blogList, setBlogList, pending, setPending}  = useContext(GlobalContext);

    const navigate = useNavigate();

    async function fetchListOfBlogs(){
        setPending(true);
        const response = await axios.get('http://localhost:5000/api/blogs');
        const result = await    response.data;

        if(result && result.blogList && result.blogList.length ){
            setBlogList(result.blogList);
            setPending(false);
        }else{ 
            setPending(false);
            setBlogList([]);
            // navigate(0);
        }
    }

    async function handleDeleteBlog(blogId) {
        const response = await axios.delete(
            `http://localhost:5000/api/blogs/delete/${blogId}`
        );
        const result = await response.data;

        if(result?.message){
            fetchListOfBlogs();
        }
    }
    
    function handleEditBlog(editedBlog){
        navigate('/addBlog', {state: {editedBlog}})
    }

    useEffect(() => {
        fetchListOfBlogs();
    }, [])


    return <div className={classes.blogWrapper}>
        <h1>Blog List</h1>
        {
            pending
            ?(<h1>Loading Blogs ! please Wait</h1>)

            :<div className={classes.blogList}>{blogList&& blogList.length ? blogList.map(blogItem => (
                <div key={blogItem._id}>
                    <p>{blogItem.title}</p>
                    <p>{blogItem.description}</p>
                    <FaEdit onClick={() => handleEditBlog(blogItem) } size={30}/>
                    <FaTrash  onClick={() => handleDeleteBlog(blogItem._id) } size={30}/>

                </div>
            )):<h1>No Blog Found</h1>
            }</div>
        }
    </div>
}