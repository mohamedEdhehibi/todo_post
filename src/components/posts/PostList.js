import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './PostList.css'
import { addDislike, addLike, deletePost, editPost } from '../../Js/Actions/actions';
import like from '../../icons/like.png'
import dislike from '../../icons/dislike.png'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';



const PostList = () => {
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.posts)
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        const selected = posts.find((el) => el.id === id);
        setSelectedPost(selected);
        setTitle(selected.title)
        setContent(selected.content)
        setShow(true);
    }

    const handleSave = () => {
        
        dispatch(editPost(selectedPost.id, {title,content}));
        setShow(false);
        
       
    }

    

    return (

 <div>
  {posts.map((post) => (
    <Card key={post.id} className='col-4 mx-auto'>  <Card.Header>
    <Card.Title as='h2'>{post.title}</Card.Title>
    </Card.Header>
        
        <Card.Body>
            <Card.Title>{post.content}</Card.Title>
            <Button className='btn btn-danger' onClick={() => dispatch(deletePost(post.id))}>Delete</Button>
            <Button variant="warning" className='mx-3' onClick={() => handleShow(post.id)}>
                  Edit
            </Button>
              <br />
   
            <img src={like} width="35" alt="like" onClick={() => dispatch(addLike(post.id))} />
                {post.like}

                <img src={dislike} width="35" alt="dislike" onClick={() => dispatch(addDislike(post.id))} />
                {post.dislike}  

            
               </Card.Body>
    </Card>
    
    ))}

            

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Postl List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                autoFocus
                                onChange={(e)=>{setTitle(e.target.value)}}
                                value={title}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea" rows={3} 
                            onChange={(e) => { setContent(e.target.value) }} 
                            value={content}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
 </div>

    )

}

// export default connect(mapStateToProps, mapDispatchToProps)(PostList)
export default PostList