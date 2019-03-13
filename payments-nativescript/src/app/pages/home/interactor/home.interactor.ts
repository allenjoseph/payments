import { Injectable } from "@angular/core";
import { setString } from "tns-core-modules/application-settings";
import { Observable } from "rxjs";
import { flatMap } from "rxjs/operators";

import { CardService } from "~/app/services/card.service";
import { PaymentService } from "~/app/services/payment.service";
import { Card, Payment } from "@payments/models";

@Injectable()
export class HomeInteractor {
  constructor(
    private cardService: CardService,
    private paymentService: PaymentService
  ) {}

  getCards(): Observable<Card[]> {
    return this.cardService.getAll();
  }

  addCard(card: Card): Observable<Card[]> {
    return this.cardService.add(card).pipe(flatMap(this.getCards.bind(this)));
  }

  addPayment(card: Card, payment: Payment): Observable<Card[]> {
    setString("cardId", card.cardId);
    return this.paymentService
      .add(payment)
      .pipe(flatMap(this.getCards.bind(this)));
  }
}
