<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'profile', methods: ['GET'])]
    public function getProfile(): JsonResponse
    {
        $user = $this->getUser();
        // dd($user);

        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        return $this->json($user);
    }
}
