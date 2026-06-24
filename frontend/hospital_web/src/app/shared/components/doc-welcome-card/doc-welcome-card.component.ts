import { Component , ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-doc-welcome-card',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './doc-welcome-card.component.html',
  styleUrl: './doc-welcome-card.component.scss'
})
export class DocWelcomeCardComponent {

}
