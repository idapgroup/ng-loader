import {
  ComponentRef,
  Directive,
  EmbeddedViewRef,
  inject,
  Input,
  TemplateRef, Type,
  ViewContainerRef,
  ɵstringify as stringify,
} from '@angular/core';
import {BLOCK_LOADER_COMPONENT, BLOCK_LOADER_CONDITION_CHECK_FN} from '../tokens';

export class AppLoaderContext<T = unknown> {
  $implicit: T = null!;
  appLoader: T  = null!;
}

@Directive({
  selector: '[appLoader]',
  standalone: true,
})
export class LoaderDirective<T = unknown> {

  readonly #templateRef = inject(TemplateRef<AppLoaderContext<T>>);
  readonly #viewContainer = inject(ViewContainerRef);
  readonly #loaderCheckFn = inject(BLOCK_LOADER_CONDITION_CHECK_FN);
  readonly #loaderComponent = inject(BLOCK_LOADER_COMPONENT);

  #context: AppLoaderContext<T> = new AppLoaderContext<T>();
  #thenTemplateRef: TemplateRef<AppLoaderContext<T>> | null = this.#templateRef;
  #elseTemplateRef: TemplateRef<AppLoaderContext<T>> | null = null;
  #thenViewRef: EmbeddedViewRef<AppLoaderContext<T>> | null = null;
  #elseViewRef: EmbeddedViewRef<AppLoaderContext<T>> | ComponentRef<unknown> | null = null;

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input()
  set appLoader(condition: T) {
    this.#context.$implicit = this.#context.appLoader = condition;
    this.#updateView();
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set appLoaderThen(templateRef: TemplateRef<AppLoaderContext<T>>|null) {
    assertTemplate('appLoaderThen', templateRef);
    this.#thenTemplateRef = templateRef;
    this.#thenViewRef = null;  // clear previous view if any.
    this.#updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set appLoaderElse(templateRef: TemplateRef<AppLoaderContext<T>>|null) {
    assertTemplate('appLoaderElse', templateRef);
    this.#elseTemplateRef = templateRef;
    this.#elseViewRef = null;  // clear previous view if any.
    this.#updateView();
  }

  #updateView() {
    if (this.#loaderCheckFn(this.#context.$implicit) && !this.#thenViewRef) {
      this.#viewContainer.clear();
      this.#elseViewRef = null;
      if (this.#thenTemplateRef) {
        this.#thenViewRef = this.#viewContainer.createEmbeddedView(this.#thenTemplateRef, this.#context);
      }
      return;
    }
    if (!this.#elseViewRef) {
      this.#viewContainer.clear();
      this.#thenViewRef = null;
      if (this.#elseTemplateRef) {
        this.#elseViewRef = this.#viewContainer.createEmbeddedView(this.#elseTemplateRef, this.#context);
        return;
      }
      if (this.#loaderComponent) {
        this.#elseViewRef = this.#viewContainer.createComponent(this.#loaderComponent);
        return;
      }
    }
  }

  static ngTemplateGuard_appLoader: 'binding';

  static ngTemplateContextGuard<T>(dir: LoaderDirective<T>, ctx: unknown): ctx is AppLoaderContext<Exclude<T, null>> {
    return true;
  }
}

function assertTemplate(property: string, templateRef: TemplateRef<unknown>| null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}
