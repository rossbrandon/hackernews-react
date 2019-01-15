import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'
import { timeDifferenceForDate } from '../utils'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const VOTE_MUTATION = gql`
  mutation VoteMutation($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`

const UNVOTE_MUTATION = gql`
  mutation unVoteMutation($linkId: ID!) {
    unvote(linkId: $linkId) {
      id
    }
  }
`

class Link extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
          <span className="gray">{this.props.index + 1}</span>
          {authToken && !this.props.link.voted ? (
            <Mutation
              mutation={VOTE_MUTATION}
              variables={{ linkId: this.props.link.id }}
              update={(store, { data: { vote } }) =>
                this.props.updateStoreAfterVote(store, vote, this.props.link.id)
              }
            >
              {voteMutation => (
                <div
                  className="ml1 gray f11 pointer votearrow"
                  onClick={voteMutation}
                />
              )}
            </Mutation>
          ) : (
            <span className="vote-spacer" />
          )}
        </div>
        <div className="ml1">
          <div>
            <a
              href={this.props.link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {this.props.link.description} ({this.props.link.url})
            </a>
          </div>
          <div className="f6 lh-copy gray">
            {this.props.link.votes.length} votes |
            {authToken && this.props.link.voted ? (
              <Mutation
                mutation={UNVOTE_MUTATION}
                variables={{ linkId: this.props.link.id }}
                update={(store, { data: { unvote } }) =>
                  this.props.updateStoreAfterUnvote(
                    store,
                    unvote,
                    this.props.link.id
                  )
                }
              >
                {unvoteMutation => (
                  <span className="pointer" onClick={unvoteMutation}>
                    {' '}
                    unvote |
                  </span>
                )}
              </Mutation>
            ) : (
              ''
            )}{' '}
            by{' '}
            {this.props.link.postedBy
              ? this.props.link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </div>
      </div>
    )
  }
}

export default Link
