import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const UpdatePostModal = () => {

    //Contexts
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast } = useContext(PostContext)

    //State

    const [updatedPost, setUpdatedPost] = useState(post)

    const { title, description, url, status, email } = updatedPost

    const onChangeUpdatedPostForm = (event) => {
        setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value })
    }

    const closeDialog = () => {
        setShowUpdatePostModal(false)
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await updatePost(updatedPost)
        setShowUpdatePostModal(false)

        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })

    }

    // const resetAddPostModal = () => {
    //     setNewPost({
    //         title: '',
    //         description: '',
    //         url: '',
    //         status: "TO LEARN"
    //     })
    //     setShowAddPostModal(false)
    // }


    return (
        <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>Making progress?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" value={title} required aria-describedby="title-help" onChange={e => {
                            setUpdatedPost({
                                ...updatedPost,
                                title: e.target.value
                            })
                        }}
                        />
                        <Form.Text id="title-help" muted>Requied</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} value={description} placeholder="Description" name="description"
                            onChange={e => {
                                setUpdatedPost({
                                    ...updatedPost,
                                    description: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" value={url} placeholder="Youtube Tutorial URL" name="url"
                            onChange={e => {
                                setUpdatedPost({
                                    ...updatedPost,
                                    url: e.target.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" value={email} placeholder="Youtube Tutorial URL" name="email"
                            onChange={e => {
                                setUpdatedPost({
                                    ...updatedPost,
                                    email: e.target.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as='select' value={status} name='status' onChange={e => {
                            setUpdatedPost({
                                ...updatedPost,
                                status: e.target.value
                            })
                        }}
                        >
                            <option value="" disabled>------OPTION-----</option>
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>

                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>Cancel</Button>
                    <Button variant="primary" type="submit">NoteApp</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default UpdatePostModal