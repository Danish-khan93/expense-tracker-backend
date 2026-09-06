import { type Request, type Response } from "express";
import type { ReqDataType } from "./auth.types.ts";
import { registerUserService } from "./auth.service.ts";
import { GlobalResponse } from "../../utilities/GlobalResponse.ts";
// register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const data = req.body as ReqDataType;
    const finalData = await registerUserService(data);
    console.log(finalData);
    const resData = finalData && {
      fullName: finalData?.createUser?.fullName,
      email: finalData?.createUser?.email,
      accessToken: finalData?.accessToken,
      refreshToken: finalData?.refreshToken,
    };

    return res
      .status(200)
      .json(
        new GlobalResponse(
          "success",
          200,
          resData,
          "User registered successfully",
        ),
      );
  } catch (error) {
    console.log("Error in registerUser:", error);
    return res
      .status(500)
      .json(
        new GlobalResponse(
          "failed",
          500,
          (error as Error).message,
          "Internal server error",
        ),
      );
  }
};

// // login
// export const loginUser = (req: Request, res: Response) => {
//   console.log(req.body);
//   // console.log(res);
// };
