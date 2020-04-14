import React from "react"
import "./global.css"

import { useStaticQuery, Link, graphql } from "gatsby"
import styles from './layout-light.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub, faStackOverflow, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const Header = ({title}) => {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.title}><Link to="/"> {title}  </Link></div>
        <div className={styles.links}>
          <div className={styles.link}><Link to="/"> Home  </Link></div>
          <div className={styles.link}> <Link to="/life">Life </Link></div>
          <div className={styles.link}><Link to="/code"> Code  </Link></div>
          <div className={styles.link}><Link to="/essays"> Essays  </Link></div>
          <div className={styles.link}><Link to="/book-notes"> Book Notes  </Link></div>
          <div className={styles.link}><Link to="/about">  About   </Link></div>
        </div>
      </div>
    </>
  )
}

const Footer = ({title}) => {
  return (
    <>
      <div className={styles.footer}>
        <div>© 2020 Sagar Karira</div>
        <a href="https://twitter.com/ekrysis">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://github.com/sagarkarira">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://stackoverflow.com/users/2706832/sagar-karira">
          <FontAwesomeIcon icon={faStackOverflow} />
        </a>
        <a href="https://www.linkedin.com/in/sagar-k-0b354162/">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </>
  )
}

export const Layout = ({children}) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div className={styles.container}>
      <Header title={data.site.siteMetadata.title}/>
      <div className={styles.main}>{children}</div>
      <Footer title={data.site.siteMetadata.title} />
    </div>
  )
}

