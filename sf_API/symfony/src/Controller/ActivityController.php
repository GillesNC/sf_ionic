<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Repository\ActivityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class ActivityController extends AbstractController
{
    #[Route('/activity', name: 'activity', methods: ['POST'])]
    public function addActivity(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return new JsonResponse(['error' => 'Données invalides'], 400);
        }

        $activity = new Activity();
        $activity->setUser($user);
        $activity->setTitle($data['title']);
        $activity->setDescription($data['description']);
        $activity->setPlace($data['place']);
        $activity->setNbrPlace($data['nbrPlace']);


        $entityManager->persist($activity);
        $entityManager->flush();

        return $this->json([
            'message' => 'Votre activité a été créée avec succès'
        ], Response::HTTP_CREATED);
    }

    #[Route('/activity', name: 'get_activities', methods: ['GET'])]
    public function getAllActivities(ActivityRepository $activityRepository): JsonResponse
    {
        $activities = $activityRepository->findAll();

        return $this->json($activities, Response::HTTP_OK, [], ['groups' => 'activity:read']);
    }

    #[Route('/activity/{id}', name: 'get_activity', methods: ['GET'])]
    public function getActivityById(ActivityRepository $activityRepository): JsonResponse
    {   
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $myActivities = $activityRepository->findAll();

        return $this->json($myActivities, Response::HTTP_OK, [], ['groups' => 'activity:show']);
    }
}
