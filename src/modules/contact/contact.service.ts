/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */

import { UnauthorizedAccessErrorResult } from "../../core/error-result";
import { IResponseType } from "../../core/IResponseType.interface";
import contactModel from "../../models/contact.model";
import ContactModel from "../../models/contact.model";
import { MESSAGE } from "../../shared/constants/app.const";
import { APP_ENUM } from "../../shared/enums/app.enum";
import { NxService } from "../../shared/nx-library/nx-service";

export class ContactService {
  constructor(private nx: NxService) { }

  findById = async (params: any): Promise<IResponseType> => {
    //eslint-disable-next-line no-useless-catch
    try {
      let response: IResponseType;
      const {id}=params;
      const Contact = await ContactModel.findOne({ id })
        .select('fullName email subjects message');
      response = { data: Contact, message: MESSAGE.GET };
      return response;
    } catch (error) {
      throw error;
    }
  }


  /**
   * @name findAll
   * @param {Object} _params 
   */
  findAll = async (_params: any): Promise<IResponseType> => {
    // eslint-disable-next-line no-useless-catch
    try {
      let response: IResponseType;
      const data = await ContactModel.find();
      console.log(data);
      response = {
        message: MESSAGE.GET,
        data: data
      };
      return response;
    } catch (error: any) {
      throw error;
    }
  }


  create = async (params: any): Promise<IResponseType> => {
    try {
      let response: IResponseType;
      console.log('params', params);
      const {fullName, email, subjects, message} = params;

      // find Customer based on company id and email or mobile
      const findContact = await ContactModel.findOne({ email });
      console.log('findContact', findContact);
      if (findContact) {
        throw new UnauthorizedAccessErrorResult(
          APP_ENUM.TYPE.ERROR.CONFLICT,
          MESSAGE.DUPLICATE
        );
      }
      const createModel = new ContactModel({
        fullName, email, subjects, message
      
      });
      const createdContact = await createModel.save();
      response = { data: createdContact, message: MESSAGE.CREATE };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }



    /**
   * @name update
   * @param {Object} params
   */
  update = async (params: any): Promise<IResponseType> => {
    try {
      let response: IResponseType;
      const { id, fullName, email, subjects, message } = params;
  
      const updateModel = {
        $set: {
          fullName,email,subjects,message,
         updated_by:id,
          updated_at: new Date()
        }
      };
      console.log(updateModel);
      const updatedContact = await ContactModel.findOneAndUpdate({ id },updateModel,{ new:true });
      response = { data: updatedContact, message: MESSAGE.UPDATE };
      console.log(updatedContact);
      return response;
    } catch (error) {
      throw error;
    }
  }


  // delete = async (params: any): Promise<IResponseType> => {
  //   try {
  //     let response: IResponseType;
  //     await ContactModel.deleteMany({ Id: params.id });
  //     response = { data: null, message: MESSAGE.DELETE };
  //     return response;
  //   } catch (error) {
  //     throw error;
  //   }
  // }


  
  /**
   * @name delete
   * @param {Object} params
   */

  
  delete = async (params: any): Promise<IResponseType> => {
    try {
      let response: IResponseType;
      const { id } = params;
      const updateModel = {
        $set: { status: APP_ENUM.STATUS.USER.DELETED, updated_at: new Date() }
      };
      const deleteContact = await ContactModel.findOneAndUpdate({ id }, updateModel, { new: true });
      response = { data: deleteContact, message: MESSAGE.DELETE };
      return response;
    } catch (error) {
      throw error;
    }
  }

} 
