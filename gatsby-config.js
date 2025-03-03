// require("dotenv").config({
//   path: `.env.${process.env.NODE_ENV}`,
// })

module.exports = {
  siteMetadata: {
    title: `StepIntoSimulation`,
    description: `Looking for a simple and smarter way to learn the latest web tech? Here, you will learn the perfect strategy that works.`,
    author: `GANESHKT`,
    twitterHandle: `ganesh.is018`,
    linkedin: `ganeshkt`,
    github: `ganesh0211`,
    siteUrl: `https://dataview-ai.netlify.app/`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-154777810-1",
        // this option places the tracking script into the head of the DOM
        head: true
        // other options
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#ff7a59`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        // I exclude individual tags pages in sitemap
        exclude: ["/tags/*"]
      }
    },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.datePublished,
                  url:
                    site.siteMetadata.siteUrl +
                    "/blog/" +
                    edge.node.fields.slug.name +
                    "/",
                  guid:
                    site.siteMetadata.siteUrl +
                    "/blog/" +
                    edge.node.fields.slug.name +
                    "/",
                  enclosure: edge.node.frontmatter.featured && {
                    url:
                      site.siteMetadata.siteUrl +
                      edge.node.frontmatter.featured.publicURL
                  },
                  custom_elements: [{ "content:encoded": edge.node.html }]
                })
              })
            },
            query: `
            {
              allMdx(
                limit: 1000
                sort: { order: DESC, fields: [frontmatter___datePublished] },
              ) {
                edges {
                  node {
                    excerpt(pruneLength: 300)
                    html
                    fields { 
                      slug {
                        name
                      }
                    }
                    frontmatter {
                      title
                      datePublished
                      featured {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
            `,
            output: "/rss.xml",
            title: "StepIntoSimulation",
            // optional configuration to insert feed reference in pages:
            // if `string` is used, it will be used to create RegExp and then test if pathname of
            // current page satisfied this regular expression;
            // if not provided or `undefined`, all pages will have feed reference inserted
            match: "^/blog/"
          }
        ]
      }
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://app.us10.list-manage.com/subscribe/post?u=22ab4a3227a2f05946ba7adab&amp;id=915058b4a3"

        // "https://netlify.us17.list-manage.com/subscribe/post?u=6c865ee0b82dcd3f851e6829a&amp;id=dfefb54d80", // add your MC list endpoint here; see instructions below
      }
    },
    // {
    //   resolve: `gatsby-source-contentful`,
    //   options: {
    //     spaceId: process.env.CONTENTFUL_SPACE_ID,
    //     accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },

    {
      resolve: `gatsby-plugin-mdx`, //`gatsby-transformer-remark`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-relative-images`,
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              linkImagesToOriginal: false
            }
          },

          {
            resolve: "gatsby-remark-katex",
            options: {
              strict: "ignore"
            }
          },
          {
            resolve: `gatsby-remark-highlight-code`,
            options: {
              terminal: "carbon",
              theme: "blackboard"
            }
          },

          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",

              inlineCodeMarker: null,

              aliases: { sh: "bash", js: "javascript" },

              showLineNumbers: true,

              noInlineHighlight: false,

              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/
                    }
                  }
                }
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false
              }
            }
          },

          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener"
            }
          }
        ]
      }
    },

    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StepIntoSimulation`,
        short_name: `Simulation`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/arif.png` // This path is relative to the root of the site.
      }
    },

    `gatsby-plugin-netlify`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
