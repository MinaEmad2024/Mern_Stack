import classes from './style.module.css'
import { Link } from 'react-router-dom'

export default function Header(){

    return <div className={classes.header}>
        <h3>Mern Stack To Do App</h3>    
        <ul>
            <Link to={"/"}><li>Home</li></Link>
            
            <Link to={"/addBlog"}><li>Add Blog</li></Link>
        </ul>
    </div>
} 