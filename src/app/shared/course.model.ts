export interface Course {
  name: string;
  duration: string;
  teacher: string;
  opinions: Opinion[];
  rating: number;
  link: string;
  img: string;
  front: string;
}

export interface Opinion {
  text: string;
}
