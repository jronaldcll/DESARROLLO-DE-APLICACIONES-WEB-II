
import { Component, input , ChangeDetectionStrategy} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface Post {
  image: string;
  title: string;
  timeAgo: string;
  description: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-latest-post',
    imports: [MatIconModule],
    templateUrl: './latest-post.component.html',
    styleUrl: './latest-post.component.scss'
})
export class LatestPostComponent {
  readonly posts = input<Post[]>([]);
}
