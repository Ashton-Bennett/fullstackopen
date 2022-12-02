/* eslint-disable */
import propTypes from 'prop-types';

const BlogForm = ({
    addBlog,
    newTitle,
    newAuthor,
    newUrl,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
}) => (
    <div>
        <h2>Create blog</h2>
        <form onSubmit={addBlog}>
            <p>
                {' '}
                Title:
                <input
                    type='text'
                    value={newTitle}
                    onChange={handleTitleChange}
                />
            </p>
            <p>
                Author:
                <input
                    type='text'
                    value={newAuthor}
                    onChange={handleAuthorChange}
                ></input>
            </p>

            <p>
                URL:
                <input
                    type='text'
                    value={newUrl}
                    onChange={handleUrlChange}
                ></input>
            </p>
            <button type='submit'>create</button>
        </form>
    </div>
);

BlogForm.propTypes = {
    addBlog: propTypes.func.isRequired,
    handleTitleChange: propTypes.func.isRequired,
    handleAuthorChange: propTypes.func.isRequired,
    handleUrlChange: propTypes.func.isRequired,
};

export default BlogForm;
