/* eslint-disable no-underscore-dangle */
import DOMElement from './dom-element';

export default class InputElement extends DOMElement {
  private _value = '';

  constructor(parentNode: HTMLElement | null, classList: string[], content: string) {
    super(parentNode, 'input', classList, content);
  }

  public set value(val: string) {
    this._value = val;
    (this.node as HTMLInputElement).value = this._value;
  }

  public get value() {
    return this._value;
  }
}
