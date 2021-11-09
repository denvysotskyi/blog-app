import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';

import { LoadingComponent } from '../admin/shared/components/loading/loading.component';

@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    LoadingComponent
  ]
})
export class SharedModule {}
