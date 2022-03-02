import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'

const AddPostModal = () => {

    //Contexts
    const { showAddPostModal, setShowAddPostModal, addPost } = useContext(PostContext)

    //State

    const [newPost, setNewPost] = useState({
        title: '',
        description: '',
        url: '',
        status: "TO LEARN",
    })

    const { title, description, url } = newPost

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

    }

    const resetAddPostModal = () => {
        setNewPost({
            title: '',
            description: '',
            url: '',
            status: "TO LEARN"
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
                        <Form.Control type="text" placeholder="Title" required aria-describedby="title-help" value={title} onChange={onChangeNewPostForm}
                        />
                        <Form.Text id="title-help" muted>Requied</Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control as="textarea" rows={3} placeholder="Description" name="description"
                            value={description}
                            onChange={onChangeNewPostForm} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control type="text" placeholder="Youtube Tutorial URL" name="url"
                            value={url}
                            onChange={onChangeNewPostForm} />
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