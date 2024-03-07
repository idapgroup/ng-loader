import { ChangeDetectionStrategy, Component } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-default-global-loader',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
  ],
  template: `
    <style>
      .global-loader__wrapper {
        position: fixed;
        z-index: 99999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .global-loader {
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
    <div class="global-loader__wrapper">
      <div class="global-loader"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultGlobalLoaderComponent {

}
