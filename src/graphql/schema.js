import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} from 'graphql';
import Thread from '../models/Thread.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), resolve: (u) => String(u._id) },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  }),
});

const ThreadType = new GraphQLObjectType({
  name: 'Thread',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), resolve: (t) => String(t._id) },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: async (thread) => {
        if (thread.author && thread.author.name) return thread.author; // already populated
        return thread.author ? await User.findById(thread.author) : null;
      },
    },
    score: {
      type: GraphQLInt,
      resolve: (thread) => Array.isArray(thread.votes) ? thread.votes.reduce((s, v) => s + (v.value || 0), 0) : 0,
    },
    createdAt: { type: GraphQLString, resolve: (t) => t.createdAt?.toISOString?.() || null },
    updatedAt: { type: GraphQLString, resolve: (t) => t.updatedAt?.toISOString?.() || null },
  }),
});

const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID), resolve: (c) => String(c._id) },
    content: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: async (comment) => {
        if (comment.author && comment.author.name) return comment.author;
        return comment.author ? await User.findById(comment.author) : null;
      },
    },
    thread: {
      type: ThreadType,
      resolve: async (comment) => (comment.thread ? await Thread.findById(comment.thread) : null),
    },
    parent: {
      type: CommentType,
      resolve: async (comment) => (comment.parent ? await Comment.findById(comment.parent) : null),
    },
    score: {
      type: GraphQLInt,
      resolve: (comment) => Array.isArray(comment.votes) ? comment.votes.reduce((s, v) => s + (v.value || 0), 0) : 0,
    },
    createdAt: { type: GraphQLString, resolve: (c) => c.createdAt?.toISOString?.() || null },
    updatedAt: { type: GraphQLString, resolve: (c) => c.updatedAt?.toISOString?.() || null },
  }),
});

const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    threads: {
      type: new GraphQLList(ThreadType),
      resolve: async () => {
        const list = await Thread.find().sort({ createdAt: -1 }).populate('author', 'name email').exec();
        return list;
      },
    },
    thread: {
      type: ThreadType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_root, { id }) => await Thread.findById(id).populate('author', 'name email').exec(),
    },
    comments: {
      type: new GraphQLList(CommentType),
      args: { threadId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async (_root, { threadId }) => await Comment.find({ thread: threadId }).populate('author', 'name email').exec(),
    },
  }),
});

const schema = new GraphQLSchema({ query: QueryType });

export default schema;

