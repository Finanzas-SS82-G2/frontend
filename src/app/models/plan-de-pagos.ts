export interface Cuota {
    position: number,
    saldo: number,
    capital: number,
    interes: number,
    segDesgravamen: number,
    segVivienda: number,
    cuota: number
}

export interface PlanDePagos {
    nombre: string,
    apellido: string,
    moneda: string,
    valorVivienda: number,
    importePrestamo: number,
    bonoBuenPagador: number,
    plazoPago: number,
    porcSeguroDesgravamen: number,
    porcSeguroVivienda: number,
    cuotaInicial: number,
    tcea: number,
    van: number,
    planDePagos: Cuota[]
}