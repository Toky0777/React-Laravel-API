import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@material-tailwind/react';
import { NavbarSimple } from '../components/NavbarSimple';

export default function MyForm(){
  const [formData, setFormData] = useState([{
    titre: "",
    description: ""
  }
  ]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    const authHeaders = {
      headers: {
        'content-type': 'application/json',
        'Authorization': 'Bearer 6|SxpI5B7fiD7MTtuZgFoXjSPLUvup5M1LfwaTyC1Dda537505'
      }
    };

    // Envoyez une requête POST à l'API Laravel
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/posts/create', formData, authHeaders);

      // Réinitialisez le formulaire
      setFormData({
        titre: "",
        description: ""
      });

      // Gérez la réponse de l'API en cas de succès
      setSuccessMessage('Publication créée avec succès! 🤓');
      setErrorMessage(null);

      console.log('Publication créée avec succès!', response.data);
    } catch (error) {
      // Gérez les erreurs de la requête (par exemple, affichez un message d'erreur)
      setErrorMessage('Erreur lors de la création de la publication 😭' );
      setSuccessMessage(null);
      console.error('Erreur lors de la création de la publication', error);
    }
  };

    return (
      <>
      <NavbarSimple/>

      <div className='container mx-auto pt-4'>

        <div className="flex flex-col items-center justify-center h-[50vh] gap-6">
          <p className='text-2xl font-semibold'>Ajouter un POST</p>

          {successMessage && <div className="success bg-teal-400 px-4 py-3 rounded-md border-teal-500 border-2 text-white">{successMessage}</div>}
          {errorMessage && <div className="error bg-red-400 px-4 py-3 rounded-md border-red-500 border-2 text-white">{errorMessage}</div>}

          <form className="flex flex-col gap-6 w-[30%]" onSubmit={handleSubmit}>
            <Input type="text" value={formData.titre} onChange={handleChange} name='titre' size="lg" color="teal" label="Titre" />
            <textarea value={formData.description} onChange={handleChange} name='description' className=' border border-gray-400 rounded-md px-2 py-1 focus:outline-none focus:border-teal-500 focus:border-2' placeholder='Description'/>
            
            <div className='flex justify-center gap-3'>
              <Button
                variant="text"
                size="sm"
                className="hidden lg:inline-block"
              >
                <span>Annuler</span>
              </Button>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                type="submit"
              >
                <span>Créer la publication</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }

