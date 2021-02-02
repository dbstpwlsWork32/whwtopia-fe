interface DaoTokenAuthPayload {
  id: number;
}

interface DaoToken {
  header: {
    alg: 'SHA256';
    typ: 'jwt';
  };
  payload: DaoTokenAuthPayload;
  signature: string;
}