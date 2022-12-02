/* eslint-disable */
import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import axios from 'axios';
import BlogForm from './components/BlogForm';
import Blog from './components/Blog';
import Togglable from './components/Togglable';

const usersInDataBase = '/api/users';

const App = () => {
    const starter = {
        fontSize: '22px',
        color: 'green',
        textAlign: 'center',
        background: 'lightGrey',
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: 5,
    };

    const errorRed = {
        fontSize: 'px',
        color: 'red',
        textAlign: 'center',
        background: 'lightGrey',
        borderStyle: 'solid',
        borderColor: 'red',
        borderRadius: 5,
    };
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [style, setStyle] = useState(starter);

    useEffect(() => {
        blogService
            .getAll()
            .then((blogs) => setBlogs(blogs.sort((a, b) => a.likes - b.likes)));
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
                username,
                password,
            });

            window.localStorage.setItem(
                'loggedNoteappUser',
                JSON.stringify(user)
            );
            console.log(window.localStorage);

            blogService.setToken(user.token);
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            setStyle(errorRed);
            setErrorMessage('Wrong username or password');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const addBlog = async (event) => {
        event.preventDefault();

        const userinDB = await axios.get(usersInDataBase);

        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0,
            user: userinDB.data.filter((x) => x.name === user.name)[0].id,
        };
        const createdBlog = await blogService.create(blogObject);
        setBlogs(blogs.concat(createdBlog));
        setStyle(starter);
        setNewAuthor('');
        setNewTitle('');
        setNewUrl('');
        setErrorMessage(
            `a new blog ${blogObject.title} by ${blogObject.author} was added`
        );
        setTimeout(() => {
            setErrorMessage(null);
        }, 5000);
    };

    const logOut = (event) => {
        event.preventDefault();
        return setUser(null);
    };

    const blogForm = () => {
        return (
            <div>
                <h1>Blogs</h1>
                <p>
                    {user.name} logged-in{' '}
                    <button onClick={logOut}>log out</button>
                </p>

                <Togglable buttonLabel='New Blog'>
                    <BlogForm
                        addBlog={addBlog}
                        logOut={logOut}
                        username={username}
                        password={password}
                        handleTitleChange={({ target }) =>
                            setNewTitle(target.value)
                        }
                        handleAuthorChange={({ target }) =>
                            setNewAuthor(target.value)
                        }
                        handleUrlChange={({ target }) =>
                            setNewUrl(target.value)
                        }
                        newTitle={newTitle}
                        newUrl={newUrl}
                        newAuthor={newAuthor}
                    />
                </Togglable>

                <div>
                    {blogs.map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            className={blog}
                            setBlogs={setBlogs}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const loginForm = () => (
        <div>
            <h1>Please login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type='text'
                        value={username}
                        name='Username'
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type='password'
                        value={password}
                        name='Password'
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>login</button>
            </form>
        </div>
    );

    return (
        <div>
            <Notification style={style} message={errorMessage} />

            {user === null ? loginForm() : <div>{blogForm()}</div>}
        </div>
    );
};

export default App;
