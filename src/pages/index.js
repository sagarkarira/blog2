import React from "react"
import { Layout } from "../components/layout/layout"
import { Link } from "gatsby"
import { Router } from '@reach/router';
import { MicroBlog } from "../components/micro-blog/micro-blog"
import { MicroBlogPage } from "../pages/microblog"
import { MicroBlogEditor } from "../pages/micro-blog-editor"

export default () => (
  <div>
    <Layout>
      <Router>
        <MicroBlogPage path="/microblog/:id" />
        <MicroBlog path="/" />
        <MicroBlogEditor path="/editor" />
      </Router>
    </Layout>
  </div>
)
