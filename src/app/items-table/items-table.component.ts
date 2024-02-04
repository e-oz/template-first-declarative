import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import type { Item } from "../types";
import { type ItemsTableHeader, ItemsTableStore } from "./items-table.store";

const defaultHeaders: ItemsTableHeader[] = [
  { path: 'firstName', label: 'First Name' },
  { path: 'lastName', label: 'Last Name' },
  { path: 'age', label: 'Age' },
  { path: 'favColor', label: 'Favorite Color' },
  { path: 'petName', label: 'Pet Name' },
];

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

  @Input() set headers(headers: ItemsTableHeader[]) {
    if (headers) {
      this.store.$headers.set(headers);
    } else {
      this.store.$headers.set(defaultHeaders);
    }
  }

  constructor() {
    this.store.$headers.set(defaultHeaders);
  }
}
