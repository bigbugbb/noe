import { Component, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['dialog.component.scss']
})
export class DialogComponent {
  @ViewChild("template")
	template: TemplateRef<any>;

  private modalRef: BsModalRef;

  @Input()
	private large = true;

	@Input()
	private staticModal = false;

	@Input()
	private showHide = true;

	@Input()
	private preventEscape = false;

	@Output()
	onHide: EventEmitter<void> = new EventEmitter<void>();

	private onHideSubscription: Subscription;

	private modalsCountOnOpen: number;

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
		this.onHideSubscription = this.modalService.onHide.subscribe((reason: string) => {
			if (this.modalsCountOnOpen === this.modalService.getModalsCount()) {
				this.modalsCountOnOpen = null;
				this.onHide.emit();
			}
		});
	}

	ngOnDestroy(): void {
		this.onHideSubscription.unsubscribe();
	}

	public show(): void {
		this.modalsCountOnOpen = this.modalService.getModalsCount();
    this.modalRef = this.modalService.show(this.template, this.getConfig());
	}

	public hide(): void {
		this.modalRef.hide();
	}

  private getConfig() {
		const config: any = {};
		if (this.staticModal) {
			config.backdrop = "static";
		}
		if (this.preventEscape) {
			config.keyboard = false;
		}
		if (this.large) {
			config.class = "modal-lg";
    }
    // ignoreBackdropClick
		return config;
	}
}