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
    banco: string,
    valorVivienda: number,
    importePrestamo: number,
    bonoBuenPagador: number,
    plazoPago: number,
    periodoGracia: number,
    tea: number,
    porcSeguroDesgravamen: number,
    porcSeguroVivienda: number,
    cuotaInicial: number,
    cuotaMensual: number,
    tcea: number,
    van: number,
    planDePagos: Cuota[]
}