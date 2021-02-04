interface UserPostInfo {
  id: number;
  name: string;
  imgUrl: string;
}

interface UserStore extends UserPostInfo {
  access_token: string;
  type: string;
}