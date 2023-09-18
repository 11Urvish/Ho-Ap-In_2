import { UnauthorizedAccessErrorResult } from "../../core/error-result";
import { IResponseType } from "../../core/IResponseType.interface";
import CustomerModel from "../../models/customer.model";
import { MESSAGE } from "../../shared/constants/app.const";
import { APP_ENUM } from "../../shared/enums/app.enum";
import { NxService } from "../../shared/nx-library/nx-service";

export class CustomerService {
  constructor(private nx: NxService) { }

  /**
   * @name create
   * @param {Object} params
   */
  create = async (params): Promise<IResponseType> => {
    try {
      let response: IResponseType;
      console.log('params', params);
      const { cid, uid, first_name, last_name, status, email, mobile, address } = params;

      // find Customer based on company id and email or mobile
      const findCustomer = await CustomerModel.findOne({ company_id: cid, $or: [{ mobile }] });
      console.log('findCustomer', findCustomer);
      if (findCustomer) {
        throw new UnauthorizedAccessErrorResult(
          APP_ENUM.TYPE.ERROR.CONFLICT,
          MESSAGE.DUPLICATE.replace('{0}', 'Phone')
        );
      }
      const createModel = new CustomerModel({
        first_name, last_name, email, mobile, address,
        company_id: cid,
        status: +status,
        created_by: uid
      });
      const createdCompany = await createModel.save();
      // eslint-disable-next-line prefer-const
      response = { data: createdCompany, message: MESSAGE.CREATE };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }



}