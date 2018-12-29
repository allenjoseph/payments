import { Observable, from, empty, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ICard } from '../_domain/card.interface';

@Injectable({
    providedIn: 'root',
})
export class CardRepository {
    private cards: ICard[] = [];

    getAll(): Observable<ICard[]> {
        return of(this.cards);
    }

    add(card: ICard): Observable<any> {
        this.cards.push(card);
        return of(card);
    }

    remove(card: ICard): Observable<any> {
        return of(card);
    }
}
