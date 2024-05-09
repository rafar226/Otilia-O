export interface Course {
  name: string;
  duration: string;
  teacher: string;
  opinions: Opinion[];
  rating: number;
  link: string;
  img: string;
  front: string;
  favorite: boolean;
}

export interface Opinion {
  opinionId: string;
  text: string;
  user: string;
  userId: string;
}
