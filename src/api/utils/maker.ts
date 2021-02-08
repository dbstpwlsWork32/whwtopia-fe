import { user, protectAccessToken } from '@/Store/user'

type JsonData = {
  [k: string]: string | number | boolean;
}

const queryMaker = (obj: JsonData) => {
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
    { subInput, init, query, token, body }:
    { subInput?: string; init?: RequestInit; query?: JsonData; token?: string | true; body?: JsonData }
    = { subInput: '' }
  ): Promise<ReturenT> {
    const baseUrl = subInput? this.input + subInput : this.input
    const requestUrl = query
      ? baseUrl + queryMaker(query)
      : baseUrl

    const defaultInit: RequestInit = {
      headers: {
        ...(
          token
            ? { 'Authorization': `Bearer ${token === true ? protectAccessToken('decode', user.access_token) : token}` }
            : undefined
        ),
        ...(
          body
            ? { 'Content-Type': 'application/json;charset=utf-8' }
            : undefined
        )
      },
      credentials: 'include'
    }

    if (body) defaultInit.body = JSON.stringify(body)

    return fetch(requestUrl, { ...defaultInit, ...init }).then(res => res.json())
  }
}