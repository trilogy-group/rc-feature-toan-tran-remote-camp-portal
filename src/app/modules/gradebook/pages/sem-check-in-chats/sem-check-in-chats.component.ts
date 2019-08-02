import { OnInit, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UtilsService } from 'src/app/shared/services/utils.service';
import { SemCheckInChatsService } from 'src/app/shared/services/sem-check-in-chats.service';
import { AccomplishmentsService } from 'src/app/shared/services/accomplishments.service';

@Component({
  selector: 'app-sem-check-in-chats',
  templateUrl: './sem-check-in-chats.component.html',
  styleUrls: ['./sem-check-in-chats.component.scss']
})
export class SemCheckInChatsComponent implements OnInit {
  private icName: string;

  public profile: any;
  public daysCompleted: number;

  public constructor(
    private readonly semCheckInChatsService: SemCheckInChatsService,
    private readonly accomplishmentsService: AccomplishmentsService,
    private readonly utilsService: UtilsService,
    private route: ActivatedRoute
  ) {
    this.icName = this.route.snapshot.queryParams['icName'];
  }

  public ngOnInit(): void {
    forkJoin(
      this.accomplishmentsService.getProfile(this.icName)
    ).subscribe(([profile]) => {
      this.profile = profile;
      this.calculateDaysCompleted();
    });
  }

  private calculateDaysCompleted(): void {
    this.daysCompleted = this.utilsService.calculateDaysCompleted(this.profile.startDate);
  }
}
