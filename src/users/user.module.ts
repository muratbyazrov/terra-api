import { Module } from "@nestjs/common";
import { UserControoler } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    controllers: [UserControoler],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}