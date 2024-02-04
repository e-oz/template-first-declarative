import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import type { Item } from "../types";
import { ItemsTableStore } from "./items-table.store";

@Component({
  selector: 'items-table',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ItemsTableStore],
})
export class ItemsTableComponent {
  protected readonly store = inject(ItemsTableStore);

  @Input({ required: true }) set items(items: Item[]) {
    if (items) {
      this.store.setItems(items);
    }
  }
}
