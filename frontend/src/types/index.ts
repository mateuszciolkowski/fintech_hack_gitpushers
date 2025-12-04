export interface User {
  id: string;
  firstName: string;
  lastName: string;
  points: number;
  avatar?: string;
  cardNumber: string;
  neighborhood?: string;
}

export interface CityEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image?: string;
  points: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}

export interface QRChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  location: string;
  expiresAt: string;
}

export interface RankingUser {
  id: string;
  firstName: string;
  lastName: string;
  points: number;
  rank: number;
  neighborhood: string;
}