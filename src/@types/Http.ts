import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { Error } from './Error';

export type Request<ReqParams = unknown, ReqBody = unknown> = ExpressRequest<
  ReqParams,
  unknown,
  ReqBody
>;

export type Response<ResBody = unknown> = ExpressResponse<ResBody | Error>;
