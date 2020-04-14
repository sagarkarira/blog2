// @ts-check

import React from 'react';
import styles from './micro-blog.module.css';
import MicroBlogPost from '../micro-blog-post/micro-blog-post';
import axios from 'axios';

/**
 *
 * @param {Number} page
 */
const getLatestPosts = async (page) => {
  const response = await axios(`/api/getLatestPosts?page=${page}`);
  if (!response && !response.data) {
    throw new Error('Response does not exist');
  }
  console.log(response.data);
  return {
    posts: response.data.data.posts,
    totalPosts: response.data.data.totalPosts,
  };
};

export default function MicroBlog() {
  const [posts, setPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      const { posts, totalPosts } = await getLatestPosts(page);
      setPosts(posts);
      setTotalPosts(totalPosts);
      setLoading(false);
    })();
  }, []);

  const handleLoadMore = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postObj = await getLatestPosts(page + 1);
    const morePost = postObj.posts;
    setPage(page + 1);
    setPosts(posts.concat(morePost));
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* <h4 id={styles.microPostTitle}>Micro Posts:  {totalPosts} </h4> */}
      {posts.map((post) => (
        <MicroBlogPost key={post._id} post={post} />
      ))}
      {loading === true ? (
        <Spinner />
      ) : (
        <div className={styles.buttonContainer}>
          {totalPosts > posts.length === true ? (
            <a className={styles.feedButton} onClick={handleLoadMore}>
              Load More ({totalPosts - posts.length} posts left)
            </a>
          ) : (
            <a></a>
          )}
        </div>
      )}
    </div>
  );
}

const Spinner = () => {
  return (
    <div className={styles.ldsFacebook}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
