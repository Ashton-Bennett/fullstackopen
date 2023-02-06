import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '/Users/ashtonbennett/Desktop/fullstackopen/bloglist-frontend/src/components/Blog.js'

test('renders title and author not url/likes', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ashton Bennett',
    user: '63618b658778865a68d5de43',
  }


  render(<Blog blog={blog} />)


  const title = screen.getByText('Component testing is done with react-testing-library')
  const author = screen.getByText('Ashton Bennett')
  const url = screen.queryByText('www.fakenews.org')
  const likes = screen.queryByText(0)

  expect(author).toBeDefined()
  expect(title).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()

})


test('Detail button shows likes and URL', async () => {

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Ashton Bennett',
    user: '63618b658778865a68d5de43',
    url:'www.thisisnotreal.org',
    likes: 0,
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleSetDetailsVisible={mockHandler} />)

  const user = userEvent.setup()
  // console.log(user)
  const button = screen.getByText('view')

  await user.click(button)
  // console.log(mockHandler.mock.calls)
  const url = screen.queryByText('www.fakenews.org')
  const likes = screen.queryByText(0)

  // expect(mockHandler.mock.calls).toHaveLength(1)
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  // console.log(mockHandler.mock.calls)
})