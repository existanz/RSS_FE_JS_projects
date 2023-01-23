import DOMElement from '../../../shared/components/base-elements/dom-element';
import SVGicons from '../../../shared/components/svg-icons';
import { Car } from '../../../shared/models/basse-types';
import garageApi from '../../services/api/garage-api';
import CarRaser from './car-racer';

export default class CarTrack extends DOMElement {
  private car: Car;

  public carRacer: CarRaser;

  private carFlag: DOMElement;

  private racerAnimation: Animation;

  constructor(parentNode: HTMLElement, car: Car) {
    super(parentNode, 'div', ['car__track']);

    this.car = car;
    this.carRacer = new CarRaser(this.node, car.color);
    this.racerAnimation = this.carRacer.node.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${(this.node.clientWidth * 92) / 100}px)`,
        },
      ],
      {
        duration: 1500,
        fill: 'forwards',
      }
    );
    this.racerAnimation.pause();
    this.carFlag = new DOMElement(this.node, 'div', ['race__flag']);
    this.carFlag.node.innerHTML = SVGicons.flag;
  }

  public update(car: Car) {
    this.carRacer.update(car.color);
  }

  public async startRacer() {
    const start = await garageApi.startEngine({ id: this.car.id, status: 'started' });
    const duration: number = parseInt(start.distance) / parseInt(start.velocity);

    this.racerAnimation = this.carRacer.node.animate(
      [
        {
          transform: 'translateX(0)',
        },

        {
          transform: `translateX(${(this.node.clientWidth * 92) / 100}px)`,
        },
      ],
      {
        duration,
        fill: 'forwards',
      }
    );
    console.log(this.racerAnimation);
    this.racerAnimation.play();
    try {
      await garageApi.switchEngine({ id: this.car.id, status: 'drive' });
    } catch (err) {
      console.log(err);
      if ((err as Error).message === '500') {
        this.racerAnimation.pause();
      }
    }
  }

  public async stopRacer() {
    this.racerAnimation?.pause();
    await garageApi.switchEngine({ id: this.car.id, status: 'stopped' });

    if (this.racerAnimation) {
      this.racerAnimation.currentTime = 0;
    }
  }
}
