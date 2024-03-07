import {ChangeDetectionStrategy, Component, computed, inject, Input, TemplateRef} from '@angular/core';
import {GlobalLoaderService} from '../../services';
import {NgComponentOutlet, NgTemplateOutlet} from '@angular/common';
import {GLOBAL_LOADER_COMPONENT} from '../../tokens';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [
    NgComponentOutlet,
    NgTemplateOutlet,
  ],
  template: `
    @if (showLoader()) {
      <div id="global-loader">
        @if (globalLoaderTemplate) {
          <ng-container *ngTemplateOutlet="globalLoaderTemplate"/>
        }
        @else if (globalLoaderComponent) {
          <ng-container *ngComponentOutlet="globalLoaderComponent"/>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalLoaderComponent {

  readonly showLoader = computed(() => this.#globalLoaderService.loading());

  readonly #globalLoaderService = inject(GlobalLoaderService);
  readonly globalLoaderComponent = inject(GLOBAL_LOADER_COMPONENT);

  @Input() globalLoaderTemplate: TemplateRef<unknown> | undefined;
}
