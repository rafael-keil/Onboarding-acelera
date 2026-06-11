const LoggerMock = {
  logExternalError: () => null,
  logInternalError: error => console.log(error),
  logAPIError: () => null,
  logAPIInfo: () => null,
}

export { LoggerMock }
