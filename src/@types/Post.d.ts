type displayHomePost = {
  id: number;
  title: string;
  date: string;
  gallary: string;
  writer: string;
  tags: string[]
  detail: {
    view: number,
    like: number
  }
}