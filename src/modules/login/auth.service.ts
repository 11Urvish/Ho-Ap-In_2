/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { UnauthorizedAccessErrorResult } from '../../core/error-result';
import { IResponseType } from '../../core/IResponseType.interface';
import AuthModel from '../../models/auth.model';
import { MESSAGE } from '../../shared/constants/app.const';
import { APP_ENUM } from '../../shared/enums/app.enum';
import { NxService } from '../../shared/nx-library/nx-service';

export class LoginService {
  constructor(private nx: NxService) {}
  create = async (params: any): Promise<IResponseType> => {
    try {
      let response: IResponseType;
      console.log('params', params);
      const { name, email, password } = params;
      console.log(params);
      const findUser = await AuthModel.findOne({ email });
      if (findUser) {
        throw new UnauthorizedAccessErrorResult(
          APP_ENUM.TYPE.ERROR.CONFLICT,
          MESSAGE.DUPLICATE
        );
      }
      const passwordHash = this.nx.crypto.hashPassword(password)
      const createModel = new AuthModel({
        name,
        email,
        password: passwordHash,
      });
      const Auth = await createModel.save();
      response = { data: Auth, message: MESSAGE.CREATE };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };

  /**
   * @name findAll
   * @param {Object} _params 
   */
  findAll= async (_params: any): Promise<IResponseType> => {
    // eslint-disable-next-line no-useless-catch
    try {
      let response: IResponseType;
      const data = await AuthModel.find();
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

  /**
   * @name login
   */
  login = async (params: any): Promise<IResponseType> => {
    try {
      console.log('Success Services');
      const USER_STATUS = APP_ENUM.STATUS.USER;
      let response: IResponseType;
      const {email , password } = params;
      console.log(params);

      // find user by email or mobile
      const findUser = await AuthModel.findOne({
        $or: [{ email: email }],
      }).select('name email password status');
      console.log('findUser.status', findUser);

      if (!findUser) {
        throw new UnauthorizedAccessErrorResult(
          APP_ENUM.ERROR_CODE.NOT_FOUND,
          MESSAGE.INVALID_CREDENTIAL
        );
      } else if (findUser && findUser.status !== USER_STATUS.ACTIVE) {
        console.log('findUser.status', findUser.status)
        if (
          findUser.status === USER_STATUS.BLOCKED
        ) {
          throw new UnauthorizedAccessErrorResult(
            APP_ENUM.ERROR_CODE.NOT_FOUND,
            MESSAGE.ACCOUNT_BLOCKED
          );
        } else {
          throw new UnauthorizedAccessErrorResult(
            APP_ENUM.ERROR_CODE.NOT_FOUND,
            MESSAGE.ACCOUNT_IN_ACTIVE
          );
        }
      }
      console.log('isPasswordVerified')
      const isPasswordVerified = await this.nx.crypto.verifyPassword(
        findUser.password,
        password
      );
      if (!isPasswordVerified) {
        throw new UnauthorizedAccessErrorResult(
          APP_ENUM.ERROR_CODE.NOT_FOUND,
          MESSAGE.INVALID_CREDENTIAL
        );
      }
      console.log('isPasswordVerified', isPasswordVerified)

      const token = await this.nx.crypto.getToken(findUser);
      const passwordHash = await this.nx.crypto.hashPassword(findUser.password);
      const userDetails = {
        id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        password: passwordHash
      };
      response = { data: { user: userDetails, token ,passwordHash }, message: MESSAGE.LOGIN };
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
}
