import { Component, inject , ChangeDetectionStrategy} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.scss'],
  imports: [FormsModule, MatButtonModule, RouterLink, MatCardModule],
})
export class Page404Component {
  private router = inject(Router);


  goToHome() {
    this.router.navigate(['/dashboard/dashboard1']);
  }
}
