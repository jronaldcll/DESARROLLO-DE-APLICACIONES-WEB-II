
import { Component, input, output , ChangeDetectionStrategy} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-user-profile-menu',
  templateUrl: './user-profile-menu.component.html',
  styleUrls: ['./user-profile-menu.component.scss'],
  imports: [
    MatMenuModule,
    FeatherIconsComponent,
    MatButtonModule
],
})
export class UserProfileMenuComponent {
  readonly userName = input<string>('');
  readonly userImg = input<string>('');

  readonly accountClicked = output<void>();
  readonly inboxClicked = output<void>();
  readonly settingsClicked = output<void>();
  readonly logoutClicked = output<void>();

  onAccountClick() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.accountClicked.emit();
  }
  onInboxClick() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.inboxClicked.emit();
  }
  onSettingsClick() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.settingsClicked.emit();
  }
  onLogoutClick() {
    // TODO: The 'emit' function requires a mandatory void argument
    this.logoutClicked.emit();
  }
}
