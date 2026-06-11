const MOCK_ALERT = 'ATENÇÃO: Todas consultas ao banco de dados devem ser mockadas em testes e2e!'

const queryFunction = response => {
  return {
    exec: async () => response,
    lean: async () => response,
  }
}

const defaultFunction = async (): Promise<any> => {
  console.log(MOCK_ALERT)
  throw Error(MOCK_ALERT)
}

const defaultExecFunction = () => {
  return {
    exec: defaultFunction,
  }
}

const DatabaseMockModel = {
  create: defaultExecFunction,
  findById: defaultExecFunction,
  findOne: defaultExecFunction,
  updateOne: defaultExecFunction,
}

const DatabaseMockProvider = {
  getModel: () => DatabaseMockModel,
}

export { DatabaseMockProvider, DatabaseMockModel, queryFunction }
