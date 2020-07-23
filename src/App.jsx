import React, {useState, useEffect} from 'react'
import './App.css'
import Post from './Post'
import {db, auth} from './firebase'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core'

function getModalStyle(){
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: '70%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}))

function App(){
    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle)

    const [posts, setPosts] = useState([])
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if(authUser){
                setUser(authUser)
            } else{
                setUser(null)
            }
        })

        return () => {
            unsubscribe();
        }
    }, [user, username])

    useEffect(() => {
        db.collection('/posts').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id, 
                data: doc.data()
            })))
        })
    }, [])

    const signUp = (e) => {
        e.preventDefault()
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(authUser => {
           return authUser.user.updateProfile({
                displayName: username
            })
        })
        .catch(e => alert(e.message))
    }

    return(
        <div className="App">

            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="app__signup">
                        <center>
                            <img 
                                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                                alt="Instagram logo"
                                className="app__headerImage"
                            />
                        </center>
                        <Input 
                            placeholder="username"
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <Input 
                            placeholder="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Input 
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button onClick={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>

            <div className="app__header">
                <img 
                    src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" 
                    alt="Instagram logo"
                    className="app__headerImage"
                />
            </div>

            <Button onClick={() => setOpen(true)}>Sign Up</Button>

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