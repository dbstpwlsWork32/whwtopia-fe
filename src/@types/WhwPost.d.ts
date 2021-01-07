type UserComment = {
  id: number;
  date: date;
  content: string;
  likes: number;
  userInfo: UserPostInfo;
}

interface WhwPostBase {
  id: number;
  title: string;
  date: date;
  content: string;
  likes: number;
  userInfo: UserPostInfo;
  views: number;
}

interface WhwPost extends WhwPostBase {
  comments: UserComment[];
}

interface WhwPostListItem extends WhwPostBase {
  comments: number;
}

interface WhwPostUnAnounce extends WhwPost {
  gallery: string;
}
interface WhwPostUnAnounceListItem extends WhwPostListItem {
  gallery: string;
}