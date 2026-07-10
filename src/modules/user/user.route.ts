import { NextFunction, Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import httpStatus  from "http-status";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import { Role } from "../../../generated/prisma/enums";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { auth } from "../../middlewares/auth";

const router = Router();


// ---Register user---
router.post("/register" ,userController.registerUser );



router.get("/me",
//     (req :Request, res : Response, next : NextFunction) =>{
//        console.log(req.cookies);
//        const {accessToken} = req.cookies;
//            console.log(accessToken);
       
//            const verfiedToken = jwtUtils.verifyToken(accessToken, config.jwt_access_secret);
       
//          if(!verfiedToken.success){
//             throw new Error(verfiedToken.error);
//          }

//             const {email, name, id, role} = verfiedToken.data as JwtPayload;
//         //    const requiredRoles = ["ADMIN", "USER", "AUTHOR" ]
//         const requiredRoles = [Role.ADMIN, Role.AUTHOR, Role.USER];

//         if(!requiredRoles.includes(role)){
//             return res.status(403).json({
//                 success : false,
//                 statusCode : httpStatus.FORBIDDEN,
//                 message : "Forbidden, you don't have permission to access this resource."
//             })
//         }
//         req.user = {
//             email,
//             name,
//             id,
//             role
//         };
//        next();
// }, 
auth(Role.ADMIN, Role.USER, Role.AUTHOR),
userController.getMyProfile)

router.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER),userController.updateMyProfile);
 export const userRoutes = router;