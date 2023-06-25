import { Consultation } from "src/app/consultation/model/consultation";

export interface PaymentPlan {
    consultation: Consultation,
    id: number,
    monthlyFee: number,
    tcea: number,
    van: number,
}
