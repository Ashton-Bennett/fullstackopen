/* eslint-disable */
import { useState, useEffect, React } from 'react';
import blogService from '/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/services/blogs.js';

const Blog = ({ blog, setBlogs }) => {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [deleteVisible, setDeleleVisible] = useState(false);
    const [blogLikes, setBlogLikes] = useState(blog.likes);

    const currentToken = window.localStorage.getItem('loggedNoteappUser');

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
    };

    useEffect(() => {
        const currentUser = 'Ashton'; //JSON.parse(currentToken).name
        if (currentUser === blog.user.name) {
            setDeleleVisible(true);
        }
    }, []);

    const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
    const showWhenVisible = { display: detailsVisible ? '' : 'none' };
    const showIfUserIsCreator = { display: deleteVisible ? '' : 'none' };

    const likeBlog = (event) => {
        event.preventDefault();

        const blogObject = {
            user: blog.user.id,
            likes: blogLikes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        };

        return blogService
            .update(blog.id, blogObject)
            .then(setBlogLikes(blogObject.likes));
    };

    const removeBlog = async (event) => {
        event.preventDefault();

        if (window.confirm('Do you really want to delete this blog?')) {
            await blogService.deleteBlog(
                blog.id,
                JSON.parse(currentToken).token,
                blog.user.id
            );

            blogService
                .getAll()
                .then((blogs) =>
                    setBlogs(blogs.sort((a, b) => a.likes - b.likes))
                );
        }
    };

    const handleSetDetails = () => {
        setDetailsVisible(false);
    };

    const handleSetDetailsVisible = () => {
        setDetailsVisible(true);
    };

    return (
        <div style={blogStyle}>
            <div className='blog'>
                <div className='title'>{blog.title} </div>
                <div>{blog.author}</div>

                <div>
                    <button onClick={handleSetDetails}>hide</button>
                </div>

                <div>
                    <button onClick={handleSetDetailsVisible}>view</button>
                </div>
            </div>
            {detailsVisible && (
                <div>
                    <div className='url'>{blog.url}</div>
                    <div className='likes'>
                        <div className='amountLikes'>{blogLikes}</div>{' '}
                        <button onClick={likeBlog}>like</button>
                    </div>

                    <div>{blog.user.name}</div>

                    <div>
                        <button onClick={removeBlog}>delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
