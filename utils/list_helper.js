const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  if (blogs.length === 1) {
    return blogs[0].likes;
  }

  return blogs.reduce((previous, current) => previous + current.likes, 0);
};
const favoriteBlog = (blogs) => {
  const mostLikedBlog = blogs.sort((a, b) => a.likes + b.likes)[0];

  return blogs.length === 0
    ? 'no blogs or favorites'
    : {
      title: mostLikedBlog.title,
      author: mostLikedBlog.author,
      likes: mostLikedBlog.likes,
    };
};

const mostBlogs = (blogs) => {
  const authorNames = blogs.map((x) => x.author);

  const authorWithMostBlogs = authorNames.reduce((allNames, name) => {
    const currCount = allNames[name] ?? 0;
    return {
      ...allNames,
      [name]: currCount + 1,
    };
  }, {});

  return {
    author: Object.keys(authorWithMostBlogs)[0],
    blogs: Object.values(authorWithMostBlogs)[0],
  };
};

const mostLikes = (blogs) => {
  const authorNamesWithDoubles = blogs.map((x) => x.author);
  const authorNames = [...new Set(authorNamesWithDoubles)];
  console.log('doubles', authorNamesWithDoubles);
  console.log('singlenames-->', authorNames);
  return 0;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
