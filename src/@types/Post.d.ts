type displayHomePost = {
  id: number;
  title: string;
  date: Date;
  gallary: string;
  writer: string;
  tags: string[]
  detail: {
    view: number,
    like: number
  }
}