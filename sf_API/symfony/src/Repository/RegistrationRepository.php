<?php

namespace App\Repository;

use App\Entity\Registration;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class RegistrationRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Registration::class);
    }

    public function getAllRegistered($value): array
    {
        return $this->createQueryBuilder('r')
            ->select('r', 'u.name', 'a.title')
            ->join('r.user', 'u')
            ->join('r.activity', 'a')
            ->where('r.activity = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getResult();
    }
}
