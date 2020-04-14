import React from "react"
import styles from "./micro-blog-post.module.css"
import { Link, graphql } from "gatsby"

export const MicroBlogPost = ({ post }) => {
  const cleanTags = post.tags
    ? post.tags.split(",").map(t => `#${t.trim()}`).join(" ")
    : "";
  const cleanDate = new Date(post.createdAt).toLocaleString()
  return (
    <div>
      <div className={styles.card}>

        <div className={styles.avatarSection}>
          <img id={styles.avatar} src="../myavatar.jpg" />
        </div>

        <div className={styles.contentSection}>
          <div className={styles.name}> { post.name }</div>
          <div className={styles.content}> { post.content } </div>
          <div className={styles.footer}>
            <Link to={`/microblog/${post._id}`}>
              <div className={styles.date}> { cleanDate } </div>
            </Link>
            <div className={styles.tags}> { cleanTags } </div>
          </div>
        </div>

      </div>
    </div>
  )
}