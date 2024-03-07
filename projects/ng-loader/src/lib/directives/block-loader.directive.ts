import {
  computed,
  Directive,
  effect,
  inject,
  Input,
  OnDestroy,
  signal,
  TemplateRef, Type,
  ViewContainerRef,
} from '@angular/core';
import {BlockLoaderService} from '../services';
import {BLOCK_LOADER_COMPONENT} from '../tokens';

@Directive({
  selector: '[appBlockLoader]',
  standalone: true
})
export class BlockLoaderDirective implements OnDestroy {

  readonly #blockLoaderName = signal<string | null>(null);

  readonly #viewContainer = inject(ViewContainerRef);
  readonly #templateRef = inject(TemplateRef<unknown>);
  readonly #blockLoaderService = inject(BlockLoaderService);
  readonly #blockLoaderComponent = inject(BLOCK_LOADER_COMPONENT);

  readonly #isShowing = computed(() => {
    const loader = this.#blockLoaderName();
    if (!loader) {
      console.warn(`Loader "${loader}" not found`);
      return false;
    }
    return !!this.#blockLoaderService.loaders()[loader];
  });

  readonly #toggleShowRef = effect(() => {
    const isShowing = this.#isShowing();
    this.updateView(isShowing);
  });

  @Input()
  set appBlockLoader(name: string) {
    this.#blockLoaderName.set(name);
  }

  ngOnDestroy(): void {
    this.#toggleShowRef.destroy();
  }

  private getLoaderComponent(): Type<unknown> | null {
    const loaderComponent = this.#blockLoaderComponent;
    if (!loaderComponent) {
      console.warn(`Loader component for ${ this.#blockLoaderName() } was not provided`);
      return null;
    }
    return loaderComponent;
  }

  private updateView(showLoader: boolean): void {
    if (!showLoader) {
      this.#viewContainer.clear();
      this.#viewContainer.createEmbeddedView(this.#templateRef);
      return;
    }
    this.#viewContainer.clear();
    const loaderComponent = this.getLoaderComponent();
    if (loaderComponent) {
      this.#viewContainer.createComponent(loaderComponent);
    }
    return;
  }

}
