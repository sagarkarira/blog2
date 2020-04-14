import React from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { Link } from 'gatsby';
import MicroBlogPost from '../components/micro-blog-post/micro-blog-post';

const MicroBlogEditor = () => {
  const initPost = {
    name: 'sagark',
    content: 'write here',
    tags: '',
    createdAt: new Date(),
  };
  const [post, setPost] = React.useState(initPost);
  const [key, setKey] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [submitAvail, setSubmitAvail] = React.useState(true);

  const handleChange = (event) => {
    setStatus('Editing');
    if (event.target.name === 'content') {
      setPost(Object.assign({ ...post }, { content: event.target.value }));
    }
    if (event.target.name === 'tags') {
      setPost(Object.assign({ ...post }, { tags: event.target.value }));
    }
    if (event.target.name === 'key') {
      setKey(event.target.value);
    }
  };
  const handleSubmit = async (event) => {
    setSubmitAvail(false);
    const response = await axios.post(`../api/addPost`, {
      ...post,
      key,
    });
    console.log(response);
    setPost(initPost);
    setStatus(response.data.message);
    setSubmitAvail(true);
  };
  return (
    <div>
      <h1>MicroBlog Editor</h1>
      Status: {status ? <div>{status}</div> : <div></div>}
      <MicroBlogPost post={post} />
      <div>
        <h5>Post:</h5>
        <TextareaAutosize
          minRows={6}
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
        />
        <h5>Tags: </h5>
        <input
          type="text"
          name="tags"
          value={post.tags}
          onChange={handleChange}
        />
        <h5>Key</h5>
        <input
          type="text"
          name="key"
          value={post.key}
          onChange={handleChange}
        />
        <br />
        Submit:
        {submitAvail && (
          <input type="submit" value="Submit" onClick={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default MicroBlogEditor;
