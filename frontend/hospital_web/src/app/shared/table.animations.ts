import {
  trigger,
  sequence,
  animate,
  transition,
  style,
} from '@angular/animations';

export const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    style({
      height: '*',
      opacity: '0',
      transform: 'translateY(-50px)',
      'box-shadow': 'none',
    }),
    sequence([
      animate(
        '.30s ease',
        style({
          height: '*',
          opacity: '.2',
          transform: 'translateY(0)',
          'box-shadow': 'none',
        })
      ),
      animate(
        '.30s ease',
        style({ height: '*', opacity: 1, transform: 'translateY(0)' })
      ),
    ]),
  ]),
]);
