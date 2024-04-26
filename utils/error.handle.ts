import { Response } from "express";
const IResponse = require("../utils/IResponse.handle");
const logError = require("../utils/logError.handle");

const handleHttp = (res: Response, execption: any, error: string) => {
  /*GUARDAR LOS ERRORES*/
  logError(execption, error);
  res.status(500).send(IResponse(execption, error, false));
};

export { handleHttp };