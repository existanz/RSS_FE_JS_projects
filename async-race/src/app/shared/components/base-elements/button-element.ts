import DOMElement from './dom-element';

export default class ButtonElement extends DOMElement {
  private _disabled = false;

  constructor(parentNode: HTMLElement | null, classList: string[], content: string) {
    super(parentNode, 'button', classList, content);
  }

  public set disabled(val: boolean) {
    this._disabled = val;
    (this.node as HTMLButtonElement).disabled = this._disabled;
  }

  public get disabled() {
    return this._disabled;
  }
}
