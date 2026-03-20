<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\Registration;
use App\Repository\ActivityRepository;
use App\Repository\RegistrationRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/activity')]
final class ActivityController extends AbstractController
{
    #[Route('/', name: 'get_activities', methods: ['GET'])]
    public function getAllActivities(ActivityRepository $activityRepository): JsonResponse
    {
        $activities = $activityRepository->showByAmount(10);
        //$activities = $activityRepository->findAll();
        return $this->json($activities, Response::HTTP_OK, [], ['groups' => 'activity:read']);
    }

    #[Route('/add', name: 'activity', methods: ['POST'])]
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
        $activity->setType($data['type']);
        $activity->setDescription($data['description']);
        $activity->setPlace($data['place']);
        $activity->setDuree($data['duree']);
        $activity->setNbrPlace($data['nbrPlace']);


        $entityManager->persist($activity);
        $entityManager->flush();

        return $this->json([
            'message' => 'Votre activité a été créée avec succès'
        ], Response::HTTP_CREATED);
    }

    #[Route('/my-activity', name: 'get_my_activities', methods: ['GET'])]
    public function getMyActivities(ActivityRepository $activityRepository): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $myActivities = $activityRepository->findby(['user' => $user]);

        return $this->json($myActivities, Response::HTTP_OK, [], ['groups' => 'activity:read']);
    }

    #[Route('/edit/{id}', name: 'edit_activity', methods: ['GET', 'POST'])]
    public function editActivity(Request $request, EntityManagerInterface $entityManager, ActivityRepository $activityRepository, int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }

        $activity = $activityRepository->find($id);

        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            return new JsonResponse(['error' => 'Données invalides'], 400);
        }

        $activity->setTitle($data['title']);
        $activity->setType($data['type']);
        $activity->setDescription($data['description']);
        $activity->setPlace($data['place']);
        $activity->setDuree($data['duree']);
        $activity->setNbrPlace($data['nbrPlace']);
        $entityManager->flush();

        return $this->json([
            'message' => 'Votre activité a été modifiée avec succès'
        ], Response::HTTP_OK);
    }

    #[Route('/delete/{id}', name: 'delete_activity', methods: ['GET','DELETE'])]
    public function deleteActivity(EntityManagerInterface $entityManager, ActivityRepository $activityRepository, int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse(['error' => 'Non authentifié'], 401);
        }
        $activity = $activityRepository->find($id);

        $entityManager->remove($activity);
        $entityManager->flush();

        return $this->json([
            'message' => 'Votre activité a été supprimée avec succès'
        ], Response::HTTP_OK);
    }

    #[Route('/{id}', name: 'get_activity', methods: ['GET'])]
    public function getActivity(ActivityRepository $activityRepository, int $id): JsonResponse
    {
        $detailActivity = $activityRepository->findOneBy(['id' => $id]);

        if (!$detailActivity) {
            return new JsonResponse(['error' => 'Activité non trouvée'], 404);
        }

        return $this->json($detailActivity, Response::HTTP_OK, [], ['groups' => 'activity:read']);
    }
}
