import React from 'react';
import Layout from '../components/layout/layout';
import { graphql, Link } from 'gatsby';
import styles from './life.module.css';

export default ({ data }) => (
  <div>
    <Layout>
      <h3>{data.allMarkdownRemark.totalCount} Life Posts</h3>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div className={styles.postSection} key={node.id}>
          <div className={styles.date}>{node.frontmatter.date}</div>
          <div className={styles.title}>
            <Link to={node.fields.slug}> {node.frontmatter.title} </Link>
          </div>
        </div>
      ))}
    </Layout>
  </div>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { section: { eq: "life" } } }
    ) {
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
`;
