import { Component } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { action } from "tns-core-modules/ui/dialogs";

@Component({
  moduleId: module.id,
  selector: "modal-add-card",
  templateUrl: "./modal-add-card.component.html",
  styleUrls: ["./modal-add-card.component.css"]
})
export class ModalAddCardComponent {
  constructor(private _params: ModalDialogParams) {}
  brand: string;
  type: string;
  dueDay: string;

  close(): void {
    this._params.closeCallback(false);
  }

  save(bank: string, description: string): void {
    if (!bank || !description || !this.brand || !this.type || !this.dueDay) {
      return;
    }
    const newCard: Card = {
      bank,
      description,
      brand: this.brand,
      type: this.type,
      dueDate: parseInt(this.dueDay, 10)
    };
    this._params.closeCallback(newCard);
  }

  onBrandTap() {
    const options = {
      title: "Select a brand",
      actions: ["VISA", "MASTERCARD"]
    };
    action(options).then(result => (this.brand = result));
  }

  onTypeTap() {
    const options = {
      title: "Select a type",
      actions: ["CRÉDITO", "DÉBITO"]
    };
    action(options).then(result => (this.type = result));
  }

  onTapDueDay() {
    const days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(`${i < 10 ? "0" : ""}${i}`);
    }
    const options = {
      title: "Select a type",
      actions: days
    };
    action(options).then(result => (this.dueDay = result));
  }
}
