import { useContext, useEffect } from 'react'
import classes from './styles.module.css'
import { GlobalContext } from '../context';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
export default function AddNewBlog(){

    const  {formData, setFormData, isEdit, setIsEdit }  = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();


    async function handleSaveBlogToDataBase() {
            const response = isEdit?  await axios.put(`http://localhost:5000/api/blogs/update/${location.state.editedBlog._id}`, {
                title: formData.title,
                description: formData.description,
            })
             :await axios.post('http://localhost:5000/api/blogs/add',{
                title: formData.title,
                description: formData.description,
            })        
            const result = await response.data;
            console.log(result);

            if(result){
                setIsEdit(false);
                setFormData({  
                    title: '',
                    description: ''
                });
            }
            navigate('/')
    }

    useEffect(() => {
        console.log(location);
        if(location.state){
            const { editedBlog } = location.state;
            setIsEdit(true);

            setFormData({
            title: editedBlog.title,
            description: editedBlog.description
            })
        };


    }, [location])

    return <div className={classes.wrapper}>
        <h1>{isEdit? 'Edit a blog' : 'Add a new blog'}</h1>
        <div className={classes.formWrapper}>
            <input type="text" 
                    name="title"
                    placeholder="Enter blog Title"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value
                    })}
            />
            <textarea name="description"
                      placeholder="Enter Blog description"
                     id="description"
                     value={formData.description}
                     onChange={(e) => setFormData({
                        ...formData,
                        description: e.target.value
                     })}
           />
           <div><button
           onClick={handleSaveBlogToDataBase}>{isEdit? 'Edit Blog' :'Add new Blog'}</button></div>
        </div>
    </div>
}