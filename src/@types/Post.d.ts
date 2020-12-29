type displayHomePost = {
  id: number;
  title: string;
  date: Date;
  gallary: string;
  writer: string;
  tags: string[];
  view: number;
  like: number;
}

type displayViewPost = {
  title: string;
  date: Date;
  writer: string;
  tags: string[];
  view: number;
  like: number;
}