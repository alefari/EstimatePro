export interface Presupuesto {
    id?: string,
    nombre: string,
    tipo: string,
    estatus: string,
    laborGubernamental?: any,
    zipCode?: any,
    laborModifier?: any,
    equipmentModifier?: any,
    materialModifier?: any,
    descripcion?: any,
    taxPercentage?: any,
    subcontractorMarkup?: any,
    estRes?: any,
    estComm?: any,
    basePrice?: any,
    contingencyPercentage?: any,
    contigencyAmount?: any,
    profitPercentage?: any,
    profitAmount?: any,
    customHourMultiplier?: any,
    overallConstructionCost?: any,
    totalProjectCost?: any,
    fecha: any,
    idUsuario?: any,
}
