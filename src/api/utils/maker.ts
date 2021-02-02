type QueryData = {
  [k: string]: string | number | boolean;
}

const queryMaker = (obj: QueryData) => {
  let query = "?"
  for (const [key, value] of Object.entries(obj)) {
    query += `${key}=${
      typeof value === 'boolean'
        ?
          value
            ? 1 : 0
        :
          encodeURIComponent(value)
    }&`
  }

  return query.replace(/&$/, '')
}

export default class {
  private readonly input: RequestInfo
  constructor(input: RequestInfo) {
    this.input = input
  }

  fetch<ReturenT>(
    { subInput, init, query }:
    { subInput?: string; init?: RequestInit; query?: QueryData}
    = { subInput: '' }
  ): Promise<ReturenT> {
    const baseUrl = subInput? this.input + subInput : this.input
    const requestUrl = query
      ? baseUrl + queryMaker(query)
      : baseUrl

    return fetch(requestUrl, init).then(res => res.json())
  }
}