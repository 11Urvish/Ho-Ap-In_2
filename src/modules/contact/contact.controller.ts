import { Request, Response } from 'express';
import { UnauthorizedAccessErrorResult } from '../../core/error-result';
import { IResponseType } from '../../core/IResponseType.interface';
import { ResponseBuilder } from '../../core/response-builder';
import { ContactService } from './contact.service';

export class ContactController {
    
    constructor(private ds: ContactService) {}

    findById = async (req: Request, res: Response) => {
      try {
        const params = { ...req.query, ...req.user };
        console.log('params', params);
        const result: IResponseType = await this.ds.findById(params);
        ResponseBuilder.Ok<IResponseType>(res, result);
      } catch (error) {
        if (error instanceof UnauthorizedAccessErrorResult) {
          return ResponseBuilder.UnauthorizedAccessError(res, error);
        }
        ResponseBuilder.InternalServerError(res, error);
      }
    }
    
    findAll = async (req: Request, res: Response) => {
        try {
          const params = { ...req.body, ...req.user };
          const result: IResponseType = await this.ds.findAll(params);
          ResponseBuilder.Ok<IResponseType>(res, result);
        } catch (error) {
          if (error instanceof UnauthorizedAccessErrorResult) {
            return ResponseBuilder.UnauthorizedAccessError(res, error);
          }
          ResponseBuilder.InternalServerError(res, error);
        }
      };


create = async (req: Request, res: Response) => {
    try {
      const params = { ...req.body, ...req.user };
      console.log(params);
      const result: IResponseType = await this.ds.create(params);
      ResponseBuilder.Ok<IResponseType>(res, result);
    } catch (error) {
      if (error instanceof UnauthorizedAccessErrorResult) {
        return ResponseBuilder.UnauthorizedAccessError(res, error);
      }
      ResponseBuilder.InternalServerError(res, error);
    }
  };

  /**
   * @name update
   * @method POST
   * @memberof RoleController
   * @description This method is used to update user
   */
  update = async (req: Request, res: Response) => {
    try {
      const params = { ...req.body, ...req.user };
      const result: IResponseType = await this.ds.update(params);
      ResponseBuilder.Ok<IResponseType>(res, result);
    } catch (error) {
      if (error instanceof UnauthorizedAccessErrorResult) {
        return ResponseBuilder.UnauthorizedAccessError(res, error);
      }
      ResponseBuilder.InternalServerError(res, error);
    }
  }

  /**
   * @name delete
   * @method POST
   * @memberof RoleController
   * @description This method is used to delete user
   */
  delete = async (req: Request, res: Response) => {
    try {
      console.log('Delete from controller')
      const params = { ...req.body, ...req.user };
      console.log(params)
      const result: IResponseType = await this.ds.delete(params);
      ResponseBuilder.Ok<IResponseType>(res, result);
    } catch (error) {
      if (error instanceof UnauthorizedAccessErrorResult) {
        return ResponseBuilder.UnauthorizedAccessError(res, error);
      }
      ResponseBuilder.InternalServerError(res, error);
    }
  }

}