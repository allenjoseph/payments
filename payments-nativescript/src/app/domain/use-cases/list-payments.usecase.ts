import { Injectable, Inject } from "@angular/core";
import * as moment from "moment";
import * as R from "ramda";
import { Payment } from "@payments/models";

import { UseCase } from "./usecase.interface";
import { PaymentRepository } from "~/app/data/repositories/payment.repository";
import {
  IPaymentHeader,
  IPaymentGroup
} from "~/app/data/entities/payment.interface";
import { IQueryOptions } from "~/app/data/datasource/datasource.interface";

@Injectable()
export class ListPaymentsUseCase implements UseCase {
  constructor(private repository: PaymentRepository) {}

  execute(): Promise<(Payment | IPaymentHeader)[]> {
    const options = <IQueryOptions>{
      orderBy: "createdAt",
      limitLast: 50
    };

    return this.repository.getAll(options).then(
      R.compose(
        this.sortPaymentGroups,
        this.groupByCreation
      )
    );
  }

  private sortPaymentGroups(
    groups: IPaymentGroup[]
  ): (Payment | IPaymentHeader)[] {
    const listViewData = [];
    R.forEach(group => {
      listViewData.push({
        isHeader: true,
        title: group.header,
        total: R.sum(<any[]>R.map(R.prop("amount"), group.payments))
      });

      listViewData.push(
        ...R.reverse(<any[]>R.sortBy(R.prop("createdAt"), group.payments))
      );
    }, groups);

    return listViewData;
  }

  private groupByCreation(payments: Payment[]): IPaymentGroup[] {
    const firstDayWeek = moment().startOf("isoWeek");
    const oneWeekAgo = moment(firstDayWeek).subtract(1, "week");
    const twoWeeksAgo = moment(firstDayWeek).subtract(2, "week");
    const threeWeeksAgo = moment(firstDayWeek).subtract(3, "week");

    const groups = [
      { header: "En esta semana", payments: [] },
      { header: "Hace 1 semana", payments: [] },
      { header: "Hace 2 semanas", payments: [] },
      { header: "Hace 3 semanas", payments: [] },
      { header: "Anteriores", payments: [] }
    ];

    R.forEach(payment => {
      const date = moment(payment.createdAt);
      const group = date.isAfter(firstDayWeek)
        ? groups[0]
        : date.isAfter(oneWeekAgo)
        ? groups[1]
        : date.isAfter(twoWeeksAgo)
        ? groups[2]
        : date.isAfter(threeWeeksAgo)
        ? groups[3]
        : groups[4];
      group.payments.push(payment);
    }, payments);

    return groups;
  }
}
