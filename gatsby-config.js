


module.exports = {
  pathPrefix: "/go-event__GATSBY-EXPRESS-GRAPHQL-APOLLO-MONGODB",
  siteMetadata: {
    title: `go-event`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Anton Savytskyi`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`
  ],
}
