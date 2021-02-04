type ResponseException = {
  statusCode: number;
  message: string
}

type ResponseUserLogin = {
  user: {
    id: number;
    imgUrl: string;
    name: string;
  },
  accessToken: string;
}

type Responselogout = ResponseException

type ResponseAccessToken = {
  access_token?: string;
}