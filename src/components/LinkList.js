import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gpl from 'graphql-tag'

const FEED_QUERY = gpl`
  {
    feed {
      links {
        id
        description
        createdAt
        postedBy {
          name
          email
        }
        voteCount
      }
    }
  }
`

class LinkList extends Component {
  render() {
    return (
      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>

          const linksToRender = data.feed.links

          return (
            <div>
              {linksToRender.map(link => (
                <Link key={link.id} link={link} />
              ))}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default LinkList
