import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { RxLocalStorage } from "ngx-reactive-storage";
import { ItemsTableComponent } from "./items-table/items-table.component";
import type { Item } from "./types";

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="d-flex flex-column gap-2 p-3">
      <div class="d-flex flex-row gap-2 justify-content-between align-items-center">
        @for (i of [0, 1, 2]; track i) {
          <div
            class="btn btn-sm {{$collectionIndex() === i ? 'btn-info' : 'btn-outline-info'}}"
            (click)="setCollectionIndex(i)"
          >
            <span>Collection {{ i + 1 }}</span>
          </div>
        }
      </div>
      <items-table [items]="$items()"/>
    </div>
  `,
  imports: [
    ItemsTableComponent
  ]
})
export class AppComponent {
  private readonly storage = new RxLocalStorage('appState', 'app');

  protected readonly $collectionIndex = this.storage.getWritableSignal(
    'collectionIndex', { initialValue: 0 }
  );

  protected setCollectionIndex(i: number) {
    this.$collectionIndex.set(i);
  }

  protected readonly $items = computed<Item[]>(() => {
    switch (this.$collectionIndex()) {
      case 0:
        return [
          { firstName: 'John', lastName: 'Doe', age: 30, favColor: 'red', petName: 'Fluffy' },
          { firstName: 'Jane', lastName: 'Doe', age: 25, favColor: 'blue', petName: 'Spot' },
          { firstName: 'Bob', lastName: 'Smith', age: 40, favColor: 'green', petName: 'Rocky' },
          { firstName: 'Alice', lastName: 'Kilian', age: 35, favColor: 'yellow', petName: 'Max' },
          { firstName: 'Charlie', lastName: 'Little', age: 50, favColor: 'purple', petName: 'Charlie' },
          { firstName: 'Eve', lastName: 'Richards', age: 45, favColor: 'orange', petName: 'Buddy' },
          { firstName: 'Frank', lastName: 'Miller', age: 60, favColor: 'pink', petName: 'Daisy' },
          { firstName: 'Grace', lastName: 'Johnson', age: 55, favColor: 'brown', petName: 'Coco' },
          { firstName: 'Hannah', lastName: 'Brown', age: 70, favColor: 'gray', petName: 'Luna' },
          { firstName: 'Ivy', lastName: 'Garcia', age: 65, favColor: 'black', petName: 'Bella' },
          { firstName: 'Jack', lastName: 'Davis', age: 80, favColor: 'white', petName: 'Charlie' },
        ];
      case 1:
        return [
          { firstName: 'Anthony', lastName: 'Gonzalez', age: 20, favColor: 'red', petName: 'Fluffy' },
          { firstName: 'Benjamin', lastName: 'Hoff', age: 25, favColor: 'blue', petName: 'Spot' },
          { firstName: 'Carter', lastName: 'Jackson', age: 30, favColor: 'green', petName: 'Rocky' },
          { firstName: 'David', lastName: 'Kim', age: 35, favColor: 'yellow', petName: 'Max' },
          { firstName: 'Ethan', lastName: 'Lewis', age: 40, favColor: 'purple', petName: 'Charlie' },
          { firstName: 'Felix', lastName: 'Moore', age: 45, favColor: 'orange', petName: 'Buddy' },
          { firstName: 'Gabriel', lastName: 'Nelson', age: 50, favColor: 'pink', petName: 'Daisy' },
          { firstName: 'Henry', lastName: 'Perez', age: 55, favColor: 'brown', petName: 'Coco' },
          { firstName: 'Ivan', lastName: 'Roberts', age: 60, favColor: 'gray', petName: 'Luna' },
          { firstName: 'Jack', lastName: 'Sanchez', age: 65, favColor: 'black', petName: 'Bella' },
          { firstName: 'Kevin', lastName: 'Taylor', age: 70, favColor: 'white', petName: 'Charlie' },
        ];
      default:
        return [
          { firstName: 'Alex', lastName: 'Anderson', age: 20, favColor: 'red', petName: 'Fluffy' },
          { firstName: 'Benjamin', lastName: 'Brown', age: 25, favColor: 'blue', petName: 'Spot' },
          { firstName: 'Carter', lastName: 'Davis', age: 30, favColor: 'green', petName: 'Rocky' },
          { firstName: 'David', lastName: 'Garcia', age: 35, favColor: 'yellow', petName: 'Max' },
          { firstName: 'Ethan', lastName: 'Hoff', age: 40, favColor: 'purple', petName: 'Charlie' },
          { firstName: 'Felix', lastName: 'Jackson', age: 45, favColor: 'orange', petName: 'Buddy' },
          { firstName: 'Gabriel', lastName: 'Kim', age: 50, favColor: 'pink', petName: 'Daisy' },
          { firstName: 'Henry', lastName: 'Lewis', age: 55, favColor: 'brown', petName: 'Coco' },
          { firstName: 'Ivan', lastName: 'Moore', age: 60, favColor: 'gray', petName: 'Luna' },
          { firstName: 'Jack', lastName: 'Nelson', age: 65, favColor: 'black', petName: 'Bella' },
          { firstName: 'Kevin', lastName: 'Perez', age: 70, favColor: 'white', petName: 'Charlie' },
        ];
    }
  });
}
