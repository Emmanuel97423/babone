export interface Stock {
    id: string;
    productId: string;
    variantId?: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
    ajustment?: StockAjustment["id"];
}
export interface StockAjustment{
    id: string;
    stockId: string;
    ajustmentStock: number;
    motif?: "inventaire reçu"|"décomptage"|"dommage" |"vol" | "perte" | "réaprovionnement retour";
    motifCode: (n: number) => 1 | 6 | 2 | 3 | 4 | 5  ;
    createdAt: Date;
    updatedAt: Date;

}