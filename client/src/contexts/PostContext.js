import React from 'react'
import { createContext, useReducer, useState } from 'react';
import { apiUrl, POST_LOADED_SUCCESS, POST_LOADED_FAIL, ADD_POST } from './constants';
import axios from 'axios'
import { postReducer } from '../reducers/postReducer'

export const PostContext = createContext()


const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postsLoading: true
    })
    const [showAddPostModal, setShowAddPostModal] = useState(false)

    //Get All Posts

    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`)
            if (response.data.success) {
                dispatch({ type: POST_LOADED_SUCCESS, payload: response.data.posts })
            }
        } catch (error) {
            dispatch({ type: POST_LOADED_FAIL })
        }
    }

    //Add post

    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost)
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    }

    //Post context data
    const postContextData = { postState, getPosts, showAddPostModal, setShowAddPostModal, addPost }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider