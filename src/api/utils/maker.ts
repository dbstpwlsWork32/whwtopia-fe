import { user, protectAccessToken } from '@/Store/user'

type QueryData = {
  [k: string]: string | number | boolean;
}

const queryMaker = (obj: QueryData) => {
  let query = "?"
  for (const [key, value] of Object.entries(obj)) {
    query += `${key}=${encodeURIComponent(value)}&`
  }

  return query.replace(/&$/, '')
}

export default class {
  private readonly input: RequestInfo
  constructor(input: RequestInfo) {
    this.input = input
  }

  fetch<ReturenT>(
    { subInput, init, query, token }:
    { subInput?: string; init?: RequestInit; query?: QueryData; token?: string | true }
    = { subInput: '' }
  ): Promise<ReturenT> {
    const baseUrl = subInput? this.input + subInput : this.input
    const requestUrl = query
      ? baseUrl + queryMaker(query)
      : baseUrl

    const initOverride: RequestInit = process.env.NODE_ENV === 'development'
      ? { ...init, credentials: 'include' }
      : { ...init }

    if (token) initOverride.headers = { 'Authorization': `Bearer ${token === true ? protectAccessToken('decode', user.access_token) : token}` }

    return fetch(requestUrl, initOverride).then(res => res.json())
  }
}