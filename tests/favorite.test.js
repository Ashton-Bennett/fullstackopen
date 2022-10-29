const favorite = require('../utils/list_helper').favoriteBlog;

describe('most liked blog', () => {
  const noBlogs = [];
  const manyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Most liked blog',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 4,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0,
    },

  ];
  test('most liked blog of many', () => {
    const result = favorite(manyBlogs);
    expect(result).toEqual({
      title: 'Most liked blog',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    });
  });
  test('no blogs to rank likes', () => {
    const result = favorite(noBlogs);
    expect(result).toEqual('no blogs or favorites');
  });
});
