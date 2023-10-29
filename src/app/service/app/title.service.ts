import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    this.setTitle(title);
  }

  setTitle(title: string | undefined) {
    if (title !== undefined) {
      this.title.setTitle(` - ${title}`);
    } else {
      this.title.setTitle(`Home`);
    }
  }
}
