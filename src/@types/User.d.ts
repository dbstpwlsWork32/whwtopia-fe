interface UserPostInfo {
  id: number;
  name: string;
  thumbnail: string;
}

interface UserStore extends UserPostInfo {
  access_token: string;
  type: string;
}