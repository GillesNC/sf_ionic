<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;

final class LoginController extends AbstractController
{
    #[Route('/login', name: 'app_login')]
    public function index(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserRepository $userRepository, JWTTokenManagerInterface $JWTTokenManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = $userRepository->findOneBy(['email' => $data['email']]);
        $hash = $userPasswordHasher->isPasswordValid($user, $data['password']);

        if (!$user || !$hash) {
            return new JsonResponse([
                'message' => 'Email ou mot de passe incorrect', Response::HTTP_BAD_REQUEST
            ]);
        }

        $token = $JWTTokenManager->create($user);

        return $this->json([
            'message' => $token, Response::HTTP_ACCEPTED
        ]);
    }
}
