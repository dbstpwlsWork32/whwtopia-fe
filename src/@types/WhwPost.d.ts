interface UserCommentBase {
  id: number;
  date: date;
  content: string;
  userInfo: UserPostInfo;
}

interface UserComment extends UserCommentBase {
  likes: number;
  reply: UserCommentBase[];
}

interface WhwPostBase {
  id: number;
  title: string;
  date: date;
  content: string;
  likes: number;
  userInfo: UserPostInfo;
  views: number;
  gallery?: GalleryInfo;
}

interface WhwPost extends WhwPostBase {
  comments: UserComment[];
}

interface WhwPostPreviewItem extends WhwPostBase {
  comments: number;
}
