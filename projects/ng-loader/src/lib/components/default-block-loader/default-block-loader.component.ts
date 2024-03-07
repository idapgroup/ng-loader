import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-default-block-loader',
  standalone: true,
  imports: [],
  template: `
    <style>
      .block-loader__wrapper {
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .block-loader {
        border: 5px solid #f3f3f3;
        -webkit-animation: spin 1s linear infinite;
        animation: spin 1s linear infinite;
        border-top: 5px solid #555;
        border-radius: 50%;
        width: 50px;
        height: 50px;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <div class="block-loader__wrapper">
      <div class="block-loader"></div>
    </div>

  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultBlockLoaderComponent {

}
