import React from "react"
import { Layout } from "../components/layout/layout"
import { graphql, Link } from "gatsby"

export default ({data}) => (
  <div>
    <Layout>
      {/* <h4>{data.allMarkdownRemark.totalCount} Book Notes</h4> */}
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>
            <div>{node.frontmatter.date}</div>
            <div>{node.frontmatter.title}</div>
          </Link>
        </div>
      ))}
    </Layout>
  </div>
)


export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }
      filter: {frontmatter: {section: {eq: "code"}}}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM DD, YYYY")
            section
            description
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`