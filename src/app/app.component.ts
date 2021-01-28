import { Component, OnInit, OnDestroy } from '@angular/core';

import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/css/css.js';
import 'codemirror/mode/shell/shell.js';
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/merge/merge.js';

import { AuthenticationTokenService } from 'src/app/shared/services/authentication-token.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private TOKEN_RENEW_CHECK_INTERVAL_IN_MS = 60 * 60 * 1000;
  private TOKEN_TIME_TO_LIVE_THRESHOLD_IN_SEC = 12 * 60 * 60;
  private tokenRenewIntervalId: ReturnType<typeof setInterval>;

  constructor(
      private readonly authenticationTokenService: AuthenticationTokenService,
      private readonly authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.startAuthenticationTokenRenewJob();
  }

  ngOnDestroy(): void {
    this.stopAuthenticationTokenRenewJob();
  }

  private startAuthenticationTokenRenewJob() {
    // periodically check if the authentication token expire time and renew if necessary
    this.tokenRenewIntervalId =
        setInterval(() => this.renewTokenIfNeed(), this.TOKEN_RENEW_CHECK_INTERVAL_IN_MS);
  }

  private stopAuthenticationTokenRenewJob() {
    // clear interval when application destroy
    clearInterval(this.tokenRenewIntervalId);
  }

  private renewTokenIfNeed() {
    if (this.authenticationTokenService.isLoggedIn() &&
        this.isRemainTokenTimeToLiveLessThanThreshold()) {
      this.authenticationService.renewToken().subscribe();
    }
  }

  private isRemainTokenTimeToLiveLessThanThreshold() {
    const tokenRemainTime: number = this.authenticationTokenService.getTokenRemainingTimeToLive();
    return tokenRemainTime < this.TOKEN_TIME_TO_LIVE_THRESHOLD_IN_SEC;
  }
}
