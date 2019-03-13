import { Observable, of, from } from "rxjs";
import { Injectable } from "@angular/core";
import { getValue, push, ServerValue } from "nativescript-plugin-firebase";
import { getString } from "tns-core-modules/application-settings";
import { map, flatMap, mergeMap, toArray } from "rxjs/operators";
import * as R from "ramda";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class CardService {
  private name: string = "/cards/";

  getAll(): Observable<Card[]> {
    return from(getValue(this.path)).pipe(
      map(this.formatCards),
      flatMap(cardsData => from(cardsData)),
      mergeMap((cardsData: any) => this.getCardPayments(cardsData)),
      toArray()
    );
  }

  add(card: Card): Observable<any> {
    card.userId = this.userId;
    card.createdAt = ServerValue.TIMESTAMP;

    return from(push(this.path, card));
  }

  remove(card: Card): Observable<any> {
    return of(card);
  }

  get path(): string {
    return this.name + this.userId;
  }

  get userId(): string {
    return getString("userId");
  }

  private getCardPayments(cardsData: any): Observable<any> {
    return from(getValue(`/payments/${cardsData.id}`)).pipe(
      map(paymentsResponse =>
        this.formatCardWithPayments(cardsData, paymentsResponse)
      )
    );
  }

  private formatCards(cardsResponse: any) {
    return R.keys(cardsResponse.value).map(id => ({
      id,
      value: cardsResponse.value[id]
    }));
  }

  private formatCardWithPayments(cardData: any, paymentsResponse: any) {
    const card: Card = cardData.value;

    const dueDay = card.dueDate || 1;
    let endDate = moment().date(dueDay);
    if (moment().date() > dueDay) {
      endDate = endDate.add(1, "M");
    }
    const startDate = moment(endDate).subtract(1, "M");

    return {
      ...card,
      cardId: cardData.id,
      payments: R.values(paymentsResponse.value),
      totalAmount: R.sum(
        R.filter(
          item => moment(item.createdAt).isBetween(startDate, endDate),
          R.values(paymentsResponse.value)
        ).map(o => o.amount)
      )
    };
  }
}
