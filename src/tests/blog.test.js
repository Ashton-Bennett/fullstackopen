/* eslint-disable */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/components/Blog.js';
import BlogForm from '/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/components/BlogForm.js';

test('renders title and author not url/likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Ashton Bennett',
        user: '63618b658778865a68d5de43',
        url: 'www.website.com',
        likes: 0,
    };

    const { container } = render(<Blog blog={blog} />);

    const initialShowBlog = container.querySelector('.blog');
    const title = container.querySelector('.title');
    const url = container.querySelector('.url');
    const likes = container.querySelector('.likes');

    expect(title).toHaveTextContent(
        'Component testing is done with react-testing-library'
    );
    expect(initialShowBlog).toHaveTextContent('Ashton Bennett');
    expect(url).toBeNull();
    expect(likes).toBeNull();
});

test('view button reveals likes and URL', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Ashton Bennett',
        user: '63618b658778865a68d5de43',
        url: 'www.thisisnotreal.org',
        likes: 0,
    };

    const { container } = render(<Blog blog={blog} />);

    const url = container.querySelector('.url');
    const likes = container.querySelector('.likes');
    const button = screen.getByText('view');

    expect(url).toBeNull();
    expect(likes).toBeNull();
    await userEvent.click(button);

    expect(userEvent.click.length === 1);
    expect(url).toBeDefined();
    expect(likes).toBeDefined();
});

test('like button multiple clicks', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Ashton Bennett',
        user: '63618b658778865a68d5de43',
        url: 'www.thisisnotreal.org',
        likes: 0,
    };

    render(<Blog blog={blog} />);

    let button = screen.getByText('view');

    await userEvent.click(button);

    button = screen.getByText('like');

    await userEvent.click(button);
    await userEvent.click(button);

    expect(userEvent.click.length === 2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const addBlog = jest.fn();
    const handleAuthorChange = jest.fn();
    const handleTitleChange = jest.fn();
    const handleUrlChange = jest.fn();
    const user = userEvent.setup();

    render(
        <BlogForm
            addBlog={addBlog}
            handleAuthorChange={handleAuthorChange}
            handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
        />
    );

    const inputs = screen.getAllByRole('textbox');
    const sendButton = screen.getByText('create');

    await user.type(inputs[0], 'testing a form...');
    await user.click(sendButton);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].content).toBe('testing a form...');
});
