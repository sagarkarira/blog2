const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, trailingSlash: false })
    console.log(slug, 'slug');
    // console.log("TCL: exports.onCreateNode -> bookNotesSlug", bookNotesSlug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log("TCL: exports.createPages -> result", node.fields.slug)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post-template.js`),
      context: {
        slug: node.fields.slug,
      }
    })
  })
}

exports.onCreatePage = async ({ page, actions}) => {
  const { createPage } = actions;
  console.log("Page - ", page.path);
  if (page.path.match(/^\/microblog/)) {
    console.log("Page - ", page.path);
    createPage({
      path: "/microblog",
      matchPath: "/microblog/*",
      component: path.resolve(`./src/pages/index.js`),
    })
  }
  if (page.path.match(/^\/micro-blog-editor/)) {
    console.log("Page - ", page.path);
    createPage({
      path: "/editor",
      component: path.resolve(`./src/pages/index.js`),
    })
  }
}