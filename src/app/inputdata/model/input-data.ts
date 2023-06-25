import { Consultation } from "src/app/consultation/model/consultation";

export interface InputData {
    bank: string,
    consultation: Consultation,
    currency: string,
    customerFirstName: string,
    customerLastName: string,
    effectiveAnnualRate: number,
    goodPayerBonus: number,
    gracePeriod: number,
    homeInsurance: number,
    housingPrice: number,
    id: number,
    initialFee: number,
    insuranceDeduction: number,
    loanAmount: number,
    paymentTerm: number,
}
