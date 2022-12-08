import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {
  NgxsStoragePluginModule,
  NgxsStoragePluginOptions,
} from '@ngxs/storage-plugin';
import { UsersState } from './list/store/users.state';
export const STORAGE_CONFIG: NgxsStoragePluginOptions = {
  /**
   * https://ngxs.gitbook.io/ngxs/plugins/storage
   */
  key: ['users.favorites'],
};

@NgModule({
  imports: [
    NgxsModule.forRoot([UsersState], {
      developmentMode: false,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false,
    }),
    NgxsLoggerPluginModule.forRoot({ disabled: true }),
    NgxsStoragePluginModule.forRoot(STORAGE_CONFIG),
  ],
  exports: [NgxsModule],
})
export class StoreModule {}
