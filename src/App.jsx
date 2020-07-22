import React, {useState} from 'react'
import './App.css'
import Post from './Post'

function App(){

    const [posts, setPosts] = useState([
        {
            imageUrl: "https://image.tmdb.org/t/p/w500/qcr9bBY6MVeLzriKCmJOv1562uY.jpg",
            username: "Franciscot",
            caption:"This is caption but idk what it is"
        },
        {
            imageUrl: "https://image.tmdb.org/t/p/w500/qcr9bBY6MVeLzriKCmJOv1562uY.jpg",
            username: "NewUser",
            caption:"This is caption but idk what it is"
        }
    ])

    return(
        <div className="App">
            <div className="app__header">
                <img 
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                    alt="Instagram logo"
                    className="app__headerImage"
                />
            </div>

            {posts.map(post => (
                <Post 
                    key={Math.random() * 1000}
                    username={post.username} 
                    caption={post.caption}
                    imageUrl={post.imageUrl}
                />
            ))}

        </div>
    )
}

export default App;