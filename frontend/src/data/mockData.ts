import type { User, CityEvent, Task, QRChallenge, RankingUser } from '../types';

export const mockUser: User = {
  id: '1',
  firstName: 'Mateusz',
  lastName: 'Kowalski',
  points: 1250,
  cardNumber: '9900000994779',
  avatar: undefined,
  neighborhood: 'Teofilów',
};

export const mockEvents: CityEvent[] = [
  {
    id: '1',
    title: 'Jarmark Bożonarodzeniowy',
    date: '2025-12-15',
    location: 'Manufaktura',
    description: 'Świąteczny jarmark z lokalnymi produktami i atrakcjami',
    points: 50,
  },
  {
    id: '2',
    title: 'Bieg Niepodległości',
    date: '2025-12-08',
    location: 'Park Poniatowskiego',
    description: 'Bieg dla całej rodziny na dystansie 5km',
    points: 100,
  },
  {
    id: '3',
    title: 'Koncert Noworoczny',
    date: '2025-12-31',
    location: 'Filharmonia Łódzka',
    description: 'Wielka Gala Sylwestrowa z orkiestrą symfoniczną',
    points: 75,
  },
  {
    id: '4',
    title: 'Koncert na Piotrkowskiej',
    date: '2025-12-20',
    location: 'Piotrkowska 104',
    description: 'Koncert uliczny z lokalnymi artystami',
    points: 40,
  },
  {
    id: '5',
    title: 'Festiwal Światła',
    date: '2025-12-28',
    location: 'Manufaktura',
    description: 'Wieczorny pokaz iluminacji i instalacji świetlnych',
    points: 60,
  },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Odwiedź lokalny sklep',
    description: 'Zrób zakupy w lokalnym sklepie i zeskanuj kod QR',
    points: 20,
    completed: false,
    type: 'daily',
  },
  {
    id: '2',
    title: 'Spacer po parku',
    description: 'Przejdź 5km w jednym z parków miejskich',
    points: 30,
    completed: true,
    type: 'daily',
  },
  {
    id: '3',
    title: 'Segreguj odpady',
    description: 'Zeskanuj kod QR przy punkcie segregacji',
    points: 15,
    completed: false,
    type: 'daily',
  },
  {
    id: '4',
    title: 'Weź udział w wydarzeniu',
    description: 'Uczestniczyj w jednym wydarzeniu miejskim',
    points: 100,
    completed: false,
    type: 'weekly',
  },
];

export const mockQRChallenges: QRChallenge[] = [
  {
    id: 'qr-001',
    title: 'Wyzwanie Piotrkowskiej',
    description: 'Zeskanuj wszystkie kody QR na ulicy Piotrkowskiej',
    points: 200,
    location: 'Piotrkowska',
    expiresAt: '2025-12-31',
  },
  {
    id: 'qr-002',
    title: 'Odkryj Manufakturę',
    description: 'Znajdź i zeskanuj 5 kodów QR w Manufakturze',
    points: 150,
    location: 'Manufaktura',
    expiresAt: '2025-12-20',
  },
];

export const mockRanking: RankingUser[] = [
  { id: '1', firstName: 'Piotr', lastName: 'Wiśniewski', points: 3200, rank: 1, neighborhood: 'Teofilów' },
  { id: '2', firstName: 'Michał', lastName: 'Szymański', points: 2150, rank: 2, neighborhood: 'Teofilów' },
  { id: '3', firstName: 'Jan', lastName: 'Kowalski', points: 1250, rank: 3, neighborhood: 'Górniak' },
  { id: '4', firstName: 'Barbara', lastName: 'Lewandowska', points: 1100, rank: 4, neighborhood: 'Doły' },
  { id: '5', firstName: 'Krystyna', lastName: 'Adamczyk', points: 950, rank: 5, neighborhood: 'Teofilów' },
  { id: '6', firstName: 'Stanisław', lastName: 'Dabrowski', points: 890, rank: 6, neighborhood: 'Janów' },
  { id: '7', firstName: 'Zofia', lastName: 'Górska', points: 820, rank: 7, neighborhood: 'Teofilów' },
  { id: '8', firstName: 'Tadeusz', lastName: 'Brzozowski', points: 750, rank: 8, neighborhood: 'Teofilów' },
  { id: '9', firstName: 'Helena', lastName: 'Wojcik', points: 680, rank: 9, neighborhood: 'Teofilów' },
  { id: '10', firstName: 'Jerzy', lastName: 'Matkowski', points: 620, rank: 10, neighborhood: 'Teofilów' },
];

export const neighborhoodRanking = [
  { name: 'Teofilów', points: 12360, rank: 1 },
  { name: 'Stary Widzew', points: 10500, rank: 2 },
  { name: 'Retkinia', points: 9800, rank: 3 },
  { name: 'Karolew', points: 8900, rank: 4 },
  { name: 'Radogoszcz', points: 8200, rank: 5 },
  { name: 'Janów', points: 7600, rank: 6 },
  { name: 'Zarzew', points: 7100, rank: 7 },
  { name: 'Górniak', points: 6300, rank: 8 },
  { name: 'Doły', points: 5800, rank: 9 },
  { name: 'Dąbrowa', points: 5200, rank: 10 },
];