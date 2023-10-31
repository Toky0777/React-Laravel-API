import React, { useEffect, useState } from 'react';
import axios from 'axios';
import noData from '../image/noData.jpg';
import { NavbarSimple } from '../components/NavbarSimple';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Input,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
  } from "@material-tailwind/react";

function View() {
  const [posts, setPosts] = useState([]);
  const [editedPost, setEditedPost] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  // Fonction pour charger la liste des publications depuis le serveur
  const loadPosts = () => {
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(response => {
        setPosts(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  function StarIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-yellow-700"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

  const handleDelete = (postId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette publication ?')) {
      const authHeaders = {
        headers: {
          'Authorization': 'Bearer 6|SxpI5B7fiD7MTtuZgFoXjSPLUvup5M1LfwaTyC1Dda537505'
        }
      };
  
      axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`, authHeaders)
        .then(response => {
          // Actualisez la liste des publications après la suppression
          const updatedPosts = posts.filter(post => post.id !== postId);
          setPosts(updatedPosts);
          console.log('Publication supprimée avec succès!', response.data);
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la publication', error);
        });
    }
  };
  
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);

  const handleOpenEditModal = (post) => {
    setEditedPost(post);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const updatedPost = {
      ...editedPost,
    };
  
    const authHeaders = {
      headers: {
        'Authorization': 'Bearer 6|SxpI5B7fiD7MTtuZgFoXjSPLUvup5M1LfwaTyC1Dda537505'
      }
    };
  
    axios
      .put(`http://127.0.0.1:8000/api/posts/edit/${editedPost.id}`, updatedPost, authHeaders)
      .then(response => {
        // Mise à jour réussie, fermez le modal
        setShowEditModal(false);

        // Chargez à nouveau la liste des publications depuis le serveur
        loadPosts();

        console.log('Publication mise à jour avec succès!', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour de la publication', error);
      });
  };
  

  return (
    <div>
        <NavbarSimple/>
        <div className='container mx-auto pt-4'>
            <div className='inline-flex justify-between items-center'>
                <p className='text-2xl font-semibold w-full'>Liste des POST</p>
                <Input className='w-full' size="sm" color="teal" label="Rechercher" icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                }
                />
            </div>
            <div className="mt-4 flex flex-wrap gap-4 w-full">
            {posts.length === 0 ? (
                <div className='inline-flex justify-center'>
                  <img src={noData} alt="no DARA" className='w-[40%] mt-10'/>
                  </div>
                  ) : (
                  posts.map(post => (
                    <Card color="transparent" shadow={true} className="w-full max-w-[26rem] px-5 " key={post.id}>
                        <CardHeader
                            color="transparent"
                            floated={false}
                            shadow={false}
                            className="mx-0 flex items-center gap-4 pt-0 pb-8"
                        >
                            <Avatar
                            size="lg"
                            variant="circular"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            alt="tania andrew"
                            />
                            <div className="flex w-full flex-col gap-0.5">
                            <div className="flex items-center justify-between">
                                <Typography variant="h5" color="blue-gray">
                                UserName{post.user_id}
                                </Typography>
                                <div className="5 flex items-center gap-0">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                </div>
                            </div>
                            <Typography color="blue-gray">{post.titre}</Typography>
                            </div>
                        </CardHeader>
                        <CardBody className="mb-6 p-0 inline-flex items-center justify-between">
                            <Typography>
                            {post.description}
                            </Typography>
                        </CardBody>
                        {/* <CardFooter className="pt-0"> */}
                          <div className='flex gap-2 pb-4'>
                          <Button
                              variant="gradient"
                              size="sm"
                              color='teal'
                              onClick={() => handleOpenEditModal(post)}
                              >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                              </svg>
                          </Button>
                          
                          <Button
                              variant="gradient"
                              size="sm"
                              color='red'
                              onClick={() => handleDelete(post.id)}
                              >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                              </svg>
                          </Button>
                          </div>
                        {/* </CardFooter> */}
                    </Card>
                  )))}
            </div>
        </div>
        <Dialog
                open={showEditModal}
                handler={handleOpen}
              >
                <DialogHeader>Edition</DialogHeader>
                <DialogBody>
                  <div className='flex flex-col gap-3'>
                  <Input
                    type="text"
                    name='titre'
                    size="lg"
                    color="teal"
                    label="Titre"
                    value={editedPost.titre}
                    onChange={(e) => setEditedPost({ ...editedPost, titre: e.target.value })}
                  />
                    <Textarea
                      label="Message"
                      value={editedPost.description}
                      onChange={(e) => setEditedPost({ ...editedPost, description: e.target.value })}
                    />
                  </div>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="text"
                    color="red"
                    onClick={() => setShowEditModal(false)}
                    className="mr-1"
                  >
                    <span>Annuler</span>
                  </Button>
                  <Button variant="gradient" color="teal" onClick={handleSaveEdit}>
                    <span>Modifier</span>
                  </Button>
                </DialogFooter>
              </Dialog>
    </div>
  );
}

export default View;
