import { ModuleWithProviders, NgModule, Optional, SkipSelf, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import {
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
} from './utils';
import { config } from '../../../config';
import { map } from 'rxjs/operators';



const socialLinks = [
  {
    url: 'https://github.com/akveo/nebular',
    target: '_blank',
    icon: 'socicon-github',
  },
  {
    url: 'https://www.facebook.com/akveo/',
    target: '_blank',
    icon: 'socicon-facebook',
  },
  {
    url: 'https://twitter.com/akveo_inc',
    target: '_blank',
    icon: 'socicon-twitter',
  },
];



@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  getRole(): Observable<string> {
    return this.authService.onTokenChange()
    .pipe(
      map((token: NbAuthJWTToken) => {
       // console.log("token.getPayload()['role']== "+token.getPayload()['role'])
        return token.isValid() ? token.getPayload()['role'] : 'guest';
      }),
    );
  }
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        token: {
          class: NbAuthJWTToken,
         // key: 'token',
        },
        login: {
          requireValidToken: false,
        },
        
        baseEndpoint: config.serverUrl+'/api/auth/',
        logout: {
          redirect: {
            success: '/auth/login',
            failure: '/auth/login',
          },
        },
        requestPass: {
          redirect: {
            success: '/auth/reset-password',
          },
        },
        resetPass: {
          redirect: {
            success: '/auth/login',
          },
        },
        errors: {
          key: 'data.errors',
        },
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      student: {
        view: ['dashboard','profile','myapplications','download'],
      },
      "sub-admin": {
       view:['SubAdminDashboard','checkEligibility'],
      },
      admin: {
       view:['adminDashboard','studentManagement','paymentDetails','checkEligibility'],
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: RoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        ...DataModule.forRoot().providers,
      ],
    };
  }
}
