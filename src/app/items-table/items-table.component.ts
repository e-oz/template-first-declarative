import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'items-table',
  standalone: true,
  imports: [],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsTableComponent {
  @Input({required: true}) items: any[] = [];
}
