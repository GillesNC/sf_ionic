<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class RegisterController extends AbstractController
{
    #[Route('/register', name: 'app_register')]
    public function index(Request $request, EntityManagerInterface $entityManager, UserPasswordHasherInterface $userPasswordHasher): JsonResponse
    {
        //Récupération des données envoyées par le client et décodage du JSON
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return new JsonResponse([
                'message' => 'Les champs sont incorrects', Response::HTTP_BAD_REQUEST
            ]);
        }

        //Verifie si le mail existe si oui retourne une erreur
        $emailExists = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if ($emailExists) {
            return new JsonResponse([
                'message' => 'L\'email existe déjà', Response::HTTP_BAD_REQUEST
            ]);
        }

        //Création user et assignation des données
        $user = new User();
        $user->setEmail($data['email']);
        $user->setUsername($data['username']);

        //Hashage du mot de passe
        $hash = $userPasswordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hash);

        $entityManager->persist($user);
        $entityManager->flush();

        return $this->json([
            'message' => 'User bien créé', Response::HTTP_CREATED
        ]);
    }
}
