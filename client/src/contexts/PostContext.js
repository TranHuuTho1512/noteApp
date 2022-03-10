import React from 'react'
import { createContext, useReducer, useState } from 'react';
import { apiUrl, POST_LOADED_SUCCESS, POST_LOADED_FAIL, ADD_POST, DELETE_POST, UPDATE_POST, FIND_POST } from './constants';
import axios from 'axios'
import { postReducer } from '../reducers/postReducer'
import setAuthToken from '../utils/setAuthToken'

export const PostContext = createContext()


const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postsLoading: true
    })
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

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

    const addPost = (setAuthToken, async (e) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, e,)
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    })



    //Delete post

    const deletePost = async postId => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`)
            if (response.data.success)
                dispatch({ type: DELETE_POST, payload: postId })
        } catch (error) {
            console.log(error)
        }
    }

    //Update postState

    const updatePost = (setAuthToken, async updatedPost => {
        try {
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost)
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post })
                return response.data
            }
        } catch (error) {
            return error.response.data ? error.response.data : { success: false, message: 'Server error' }
        }
    })

    // Find post when user is updating post
    const findPost = (postId) => {
        const post = postState.posts.find(post => post._id === postId)
        dispatch({ type: FIND_POST, payload: post })
    }

    //Post context data
    const postContextData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPost,
        showUpdatePostModal,
        setShowUpdatePostModal
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    )
}

export default PostContextProvider