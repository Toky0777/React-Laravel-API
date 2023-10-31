import React, { Component } from 'react';
import axios from 'axios';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { NavbarSimple } from '../components/NavbarSimple';

const TABLE_HEAD = ["Titre", "Description", "Publié par", "Action"];

class ListPost extends Component {
  constructor() {
    super();
    this.state = {
      posts: [] // Initialisez l'état avec un tableau vide pour stocker les données.
    };
  }

  componentDidMount() {
    // Effectuez la requête Axios pour récupérer les données de l'API Laravel.
    axios.get('http://127.0.0.1:8000/api/posts')
      .then(response => {
        this.setState({ posts: response.data.items }); // Mettez à jour l'état avec les données reçues.
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
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
            <div className="mt-4">
              <Card className="h-full p-4">
                      <table className="table-auto text-left">
                          <thead>
                          <tr>
                              {TABLE_HEAD.map((head) => (
                              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 py-4">
                                  <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                                  >
                                  {head}
                                  </Typography>
                              </th>
                              ))}
                          </tr>
                          </thead>
                          <tbody>
                          {this.state.posts.map(post => (
                  
                              
                              <tr key={post.id}>
                                  <td className={post.titre}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                    {post.titre}
                                    </Typography>
                                  </td>
                                  <td className={`${post.description} bg-blue-gray-50/50`}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                    {post.description}
                                    </Typography>
                                  </td>
                                  <td className={post.user_id}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                    {post.user_id}
                                    </Typography>
                                  </td>
                                  <td className={` bg-blue-gray-50/50`}>
                                    <Button
                                        variant="small"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                        color='teal'
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg>
                                    </Button>
                                    <Button
                                        variant="small"
                                        size="sm"
                                        className="hidden lg:inline-block"
                                        color='red'
                                        >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg>
                                    </Button>
                                  </td>
                              </tr>
                              )
                          )}
                          </tbody>
                      </table>
                  </Card>
              </div>
            </div>
      </div>
    );
  }
}

export default ListPost;
