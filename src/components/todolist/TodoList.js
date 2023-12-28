import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card';
import { deleteTodo, doneTodo, editTodo } from '../../Js/Actions/actions';
import './TodoList.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


/* const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        deleteArticle: id => dispatch(deletePost(id)),
        addLike: id => dispatch(addLike(id)),
        removeLike: id => dispatch(removeLike(id))
    }
} */
const TodoList = () => {
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);

    const handleClose = () => {
        setShow(false);
        setSelectedTodo(null);
    };

    const handleShow = (id) => {
        const selected = todos.find((el) => el.id === id);
        setSelectedTodo(selected);
        setDescription(selected.description);
        setShow(true);


    };

    const handleSaveChanges = () => {
        // Mettez à jour la tâche dans le store Redux ici
        dispatch(editTodo(selectedTodo.id, description));
        handleClose();
    };
    console.log(description);

    return (
        <div>
            {todos.map((todo) => (
                <Card key={todo.id} className='col-4 mx-auto'>
                    <Card.Header>
                        <Card.Title as='h2' className={todo.isDone ? 'done' : 'undone'}>{todo.description}</Card.Title>
                    </Card.Header>

                    <Card.Body>

                        <Button style={{ marginRight: 10 }} variant='danger' onClick={() => dispatch(deleteTodo(todo.id))}>     Delete
                        </Button>

                        <Button variant="warning" style={{ marginRight: 10 }} onClick={() => handleShow(todo.id)}>
                            Edit
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit a Todo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="exampleForm.ControlTextarea1"
                                    >


                                        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant='success' onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Button variant='success' onClick={() => dispatch(doneTodo(todo.id))}>     Done
                        </Button>
                    </Card.Body>

                </Card>))}

        </div>

    );
};
{/* <Button onClick={()=>props.addLike(post.id)}>{post.like}</Button> */ }

// export default connect(mapStateToProps, mapDispatchToProps)(PostList)
export default TodoList