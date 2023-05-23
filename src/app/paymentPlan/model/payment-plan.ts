import { InputData } from "src/app/inputdata/model/input-data";
import { User } from "src/app/users/model/user";

export interface PaymentPlan {
    financingAmount: number,
    goodPayerBonus: number,
    id: number,
    inputInformation: InputData,
    monthlyFee: number,
    otherPostage: number,
    tir: number,
    user: User,
    van: number,
}
