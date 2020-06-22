import { DecimalPipe } from '@angular/common';

export interface Vendas {
    id: number,
    total: DecimalPipe,
    data: Date
}