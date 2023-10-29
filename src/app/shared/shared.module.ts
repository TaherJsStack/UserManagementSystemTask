import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
  ],
  imports: [
    FormsModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    RouterModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule {}
