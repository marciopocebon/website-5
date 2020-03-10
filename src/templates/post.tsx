import React from 'react'
import {Link, graphql} from 'gatsby'
import {MDXRenderer} from 'gatsby-plugin-mdx'
import useDarkMode from 'use-dark-mode'

import Layout from '../components/layout'
import Head from '../components/head'

import {styled, createGlobalStyle, prism_light, prism_dark} from '../styles/theme'

const StyledUl = styled('ul')`
  list-style-type: none;

  li::before {
    content: '' !important;
    padding-right: 0 !important;
  }
`

export default ({data}: {data: any}) => {
  const {post, next, previous, site} = data
  const {excerpt, body, image} = post

  const darkMode = useDarkMode(false)
  const PrismTheme = createGlobalStyle`${darkMode.value ? prism_dark : prism_light}`

  return (
    <>
      <PrismTheme />
      <Layout title={site.siteMetadata.title}>
        <Head title={post.frontmatter.title} description={excerpt} image={image} />
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <div className={'page-content'}>
            <MDXRenderer>{body}</MDXRenderer>
            <StyledUl>
              {previous && (
                <li>
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                </li>
              )}
              {next && (
                <li>
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                </li>
              )}
            </StyledUl>
          </div>
        </article>
      </Layout>
    </>
  )
}

export const query = graphql`
  query($slug: String!, $previous: String!, $next: String!) {
    ...site
    post: mdx(frontmatter: {slug: {eq: $slug}}) {
      ...page
    }
    next: mdx(frontmatter: {slug: {eq: $next}}) {
      ...page
    }
    prev: mdx(frontmatter: {slug: {eq: $previous}}) {
      ...page
    }
  }
`
