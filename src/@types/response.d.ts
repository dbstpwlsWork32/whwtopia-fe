type ResponseException = {
  statusCode: number;
  message: string
}

type ResponseUserLogin = {
  user: {
    id: number;
    thumbnail: string;
    name: string;
  },
  accessToken: string;
}

type Responselogout = ResponseException

type ResponseAccessToken = {
  access_token?: string;
}

type ResponseGetCategory = {
  data: string[]
}