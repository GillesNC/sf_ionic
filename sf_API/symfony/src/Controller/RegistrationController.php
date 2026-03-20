<?php

namespace App\Controller;

use App\Entity\User;
use App\Entity\Registration;
use App\Repository\ActivityRepository;
use App\Repository\RegistrationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/registration')]
final class RegistrationController extends AbstractController
{
    #[Route('/{activityId}', name: 'app_registration', methods: ['POST'])]
    public function register(ActivityRepository $activityRepository, EntityManagerInterface $entityManager, int $activityId): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $activity = $activityRepository->find($activityId);
        if (!$activity) {
            return new JsonResponse(['message' => 'Activité non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }

        if ($activity->getUser() === $user) {
            return new JsonResponse(['error' => 'Vous ne pouvez pas vous inscrire à votre propre activité'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $registration = new Registration();
        $registration->setUser($user);
        $registration->setActivity($activity);

        $entityManager->persist($registration);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Inscription réussie'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/delete/{id}', name: 'app_unregistration', methods: ['DELETE'])]
    public function unregister(RegistrationRepository $registrationRepository, EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $registrationActivity = $registrationRepository->find($id);
        if (!$registrationActivity) {
            return new JsonResponse(['message' => 'Inscription non trouvée'], JsonResponse::HTTP_NOT_FOUND);
        }
        //dd($registrationActivity);

        $entityManager->remove($registrationActivity);
        $entityManager->flush();

        return new JsonResponse(['message' => 'Désinscription réussie'], JsonResponse::HTTP_OK);
    }
    
    #[Route('/registered', name: 'app_registered_activities', methods: ['GET'])]
    public function getRegisteredActivities(RegistrationRepository $registrationRepository): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['message' => 'Utilisateur non authentifié'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $registrations = $registrationRepository->getAllRegistered(['user' => $user]);

        return $this->json($registrations, JsonResponse::HTTP_OK, [], ['groups' => 'registration:read']);
    }
}
