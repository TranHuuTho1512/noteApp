import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {

    //Contexts
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } = useContext(PostContext)

    //State

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: "TO LEARN",
        email: ""
    })

    const { title, description, url, email } = newPost

    const onChangeNewPostForm = (event) => {
        setNewPost({ ...newPost, [event.target.name]: event.target.value })
    }

    const closeDialog = () => {
        resetAddPostModal()
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, message } = await addPost(newPost)
        resetAddPostModal()
        setShowToast({ show: true, message, type: success ? 'success' : 'danger' })

    }

    const resetAddPostModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: "TO LEARN",
            email: ""
        })
        setShowAddPostModal(false)
    }


    return (
        <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to note ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Title" required aria-describedby="title-help" onChange={e => {
                            setNewPost({
                                ...newPost,
                                title: e.target.value
                            })
                        }}
                        />
                        <Form.Text id="title-help" muted>Requied</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} placeholder="Description" name="description"
                            onChange={e => {
                                setNewPost({
                                    ...newPost,
                                    description: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Youtube Tutorial URL" name="url"
                            onChange={e => {
                                setNewPost({
                                    ...newPost,
                                    url: e.target.value
                                })
                            }} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} placeholder="Email" name="email"
                            onChange={e => {
                                setNewPost({
                                    ...newPost,
                                    email: e.target.value
                                })
                            }}
                        />
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

export default AddPostModal