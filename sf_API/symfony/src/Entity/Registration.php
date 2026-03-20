<?php

namespace App\Entity;

use App\Repository\RegistrationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: RegistrationRepository::class)]
class Registration
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['registration:read', 'registration:show'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'registrations')]
    #[Groups(['registration:read', 'registration:show'])]
    private ?User $user = null;

    #[ORM\ManyToOne(inversedBy: 'registrations')]
    #[Groups(['registration:read', 'registration:show'])]
    private ?Activity $activity = null;

    #[ORM\Column]
    #[Groups(['registration:read', 'registration:show'])]
    private \DateTimeImmutable $registeredAt;

    public function __construct()
    {
        $this->registeredAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getActivity(): ?Activity
    {
        return $this->activity;
    }

    public function setActivity(?Activity $activity): static
    {
        $this->activity = $activity;

        return $this;
    }

    public function getRegisteredAt(): \DateTimeImmutable
    {
        return $this->registeredAt;
    }
}
