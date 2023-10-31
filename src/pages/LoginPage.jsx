import React from 'react';
import { Link } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";

export default function LoginPage() {
  return (
    <div className='container mx-auto flex justify-center items-center h-[100vh]'>
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Se connecter
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Mot de passe" size="lg" />
        <div className="-ml-2.5">
          <Checkbox label="Se souvenir de moi" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
      <Link to="/Post">
        <Button variant="gradient" fullWidth>
        Se connecter
        </Button>
        </Link>
        <Typography variant="small" className="mt-6 flex justify-center">
        Vous n'avez pas de compte ?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Inscrivez-vous
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
    </div>
  )
}
