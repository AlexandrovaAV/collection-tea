import {Observable, Subscription} from "rxjs";

declare var $: any;
import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy {

  @ViewChild('modal')
  private modal!: ElementRef;

  private observable: Observable<ElementRef>;
  private subscription$: Subscription | null = null;

  constructor() {

    this.accordionTool();

    this.observable = new Observable((observer) => {
      const timeout = setTimeout(() => {
        observer.next(this.modal);
      }, 10_000);

      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    });

  }

  ngOnInit(): void {
    this.subscription$ = this.observable.subscribe({
      next(modal) {
        modal.nativeElement.classList.add('d-block');
      }
    });
  }

  ngOnDestroy() {
    this.subscription$?.unsubscribe();
  }

  showModal() {
    if (Array.from(this.modal.nativeElement.classList).includes('d-block')) {
      this.modal.nativeElement.classList.remove('d-block');
    }
  }

  private accordionTool() {
      $(function () {
        $("#accordion").accordion({
          collapsible: true,
          heightStyle: "content"
        });
      });
  }
}
