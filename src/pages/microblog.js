import React from "react"
import axios from "axios"
import { Layout } from "../components/layout/layout"
import { Link } from "gatsby"
import { Router } from "@reach/router"
import { MicroBlogPost } from "../components/micro-blog-post/micro-blog-post"

export const MicroBlogPage = (props) => {
  const { id } = props;
  const [loading, setLoading] = React.useState(true)
  const [post, setPost] = React.useState({})
  React.useEffect(() => {
    (async () => {
      const response = await axios(`http://localhost:3000/api/getPost/${id}`)
      setLoading(false)
      setPost(response.data.data)
    })()
  }, []);
  return (
    <div>
      {
        loading === true
        ? <div>Loading</div>
        : <MicroBlogPost post={post} />
      }
    </div>
  )
}
