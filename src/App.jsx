import React, {useState, useEffect} from 'react'
import './App.css'
import Post from './Post'
import {db} from './firebase'

function App(){

    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collection('/posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                data: doc.data()
            })))
        })
    }, [])

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
                    key={post.id}
                    username={post.data.username} 
                    caption={post.data.caption}
                    imageUrl={post.data.imageUrl}
                />
            ))}

        </div>
    )
}

export default App;