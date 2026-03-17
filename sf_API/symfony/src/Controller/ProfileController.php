<?php

namespace App\Controller;

use App\Entity\User;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ProfileController extends AbstractController
{
    #[Route('/profile/{id}', name: 'profile', methods: ['GET'])]
    public function getProfile(User $user, JWTTokenManagerInterface $JWTTokenManager): JsonResponse
    {
        $token = $JWTTokenManager->create($user);

        if (!$user || !$token) {
            return $this->json(['error' => 'User not found'], JsonResponse::HTTP_NOT_FOUND);
        } 

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'name' => $user->getName(),
            'token' => $token
        ]);

    }
}
