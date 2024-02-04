import { computed, Injectable, signal } from "@angular/core";
import type { Item } from "../types";

export type ItemsTableHeader = {
  path: keyof Item;
  label: string;
}

@Injectable()
export class ItemsTableStore {
  readonly $headers = signal<ItemsTableHeader[]>([]);
  readonly $sortByHeader = signal<keyof Item | undefined>(undefined);
  readonly $sortingOrder = signal<'asc' | 'desc'>('asc');
  readonly $itemsPerPage = signal<number>(5);
  readonly $page = signal<number>(0);

  private readonly $inputItems = signal<Item[]>([]);

  readonly $sortedItems = computed(() => {
    const sortPath = this.$sortByHeader();
    if (!sortPath) {
      return this.$inputItems();
    }
    const items = this.$inputItems().slice();

    items.sort((a, b) => {
      const aVal = a[sortPath];
      const bVal = b[sortPath];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal < bVal ? -1 : (aVal > bVal ? 1 : 0);
      } else {
        return a[sortPath].toString().localeCompare(b[sortPath].toString());
      }
    });

    if (this.$sortingOrder() === 'asc') {
      return items;
    } else {
      return items.reverse();
    }
  });

  readonly $items = computed(() => {
    const page = this.$page();
    const items = this.$sortedItems();
    const perPage = this.$itemsPerPage();
    if (page === 0 && items.length <= perPage) {
      return items;
    }
    return items.slice(page * perPage, page * perPage + perPage);
  });

  setItems(items: Item[]) {
    this.$inputItems.set(items.slice());
  }

  changeSorting(path: keyof Item) {
    if (path === this.$sortByHeader()) {
      if (this.$sortingOrder() === 'asc') {
        this.$sortingOrder.set('desc');
      } else {
        this.$sortByHeader.set(undefined);
      }
    } else {
      this.$sortByHeader.set(path);
      this.$sortingOrder.set('asc');
    }
  }

  prevPage() {
    const page = this.$page();
    if (page > 0) {
      this.$page.set(page - 1);
    }
  }

  nextPage() {
    const page = this.$page();
    const items = this.$sortedItems();
    if (items.length > ((page + 1) * this.$itemsPerPage())) {
      this.$page.set(page + 1);
    }
  }
}