import { Component, Input } from '@angular/core';

@Component({
  selector: 'noe-collapse-filter',
  templateUrl: 'collapse-filter.component.html',
  styleUrls: ['collapse-filter.component.scss']
})
export class CollapseFilterComponent {
  @Input()
  private filterId;

  @Input()
  private title: string;

  public collapse = true;

  public toggleCollapse() {
    this.collapse = !this.collapse;
  }
}
