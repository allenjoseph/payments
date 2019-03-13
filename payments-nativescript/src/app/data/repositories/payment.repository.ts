import { Injectable, Inject } from "@angular/core";
import { Payment } from "@payments/models";

import { DataSource, IQueryOptions } from "../datasource/datasource.interface";
import { DataSourceProvider } from "../datasource/firebase.datasource";

@Injectable({
  providedIn: "root"
})
export class PaymentRepository {
  constructor(@Inject(DataSourceProvider) private dataSource: DataSource) {}

  getAll(query?: IQueryOptions): Promise<Payment[]> {
    return query ? this.dataSource.query(query) : this.dataSource.list();
  }
}
