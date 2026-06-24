import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { Directionality } from '@angular/cdk/bidi';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { APP_ROUTE } from './app.routes';
import { provideRouter } from '@angular/router';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { errorInterceptorFn } from '@core/interceptor/error.interceptor';
import { DirectionService, LanguageService, AppDirectionality } from '@core';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { enGB } from 'date-fns/locale';
import { FeatherModule } from 'angular-feather';
// TASK-03: Tree-shaken icon set — replaces allIcons to save ~140KB from bundle
import {
  Activity, AlertCircle, AlertTriangle, Archive, ArrowLeft, ArrowRight,
  Award, BarChart2, Bell, Briefcase, Calendar, Camera, Check, CheckCircle,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Clipboard,
  Cloud, Code, Copy, CreditCard, Database, Download, Edit, Edit2, Edit3,
  Eye, EyeOff, File, FileText, Filter, Flag, Folder, Grid, Hash, Heart,
  HelpCircle, Home, Image, Info, Key, Layers, Layout, List, Lock, LogOut,
  Mail, Map, MapPin, Maximize, Menu, MessageCircle, MessageSquare, Minus,
  Monitor, Moon, MoreHorizontal, MoreVertical, Package, Paperclip, Phone,
  PieChart, Plus, PlusCircle, Printer, RefreshCw, Save, Search, Send,
  Settings, Share2, Shield, Sliders, Star, Sun, Tablet, Tag, Trash, Trash2,
  TrendingDown, TrendingUp, Upload, User, UserCheck, UserMinus, UserPlus,
  Users, Video, Wifi, X, XCircle, Zap,
} from 'angular-feather/icons';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { appInitializerProviders } from '@core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogConfig,
} from '@angular/material/dialog';
import { provideServiceWorker } from '@angular/service-worker';

const usedIcons = {
  Activity, AlertCircle, AlertTriangle, Archive, ArrowLeft, ArrowRight,
  Award, BarChart2, Bell, Briefcase, Calendar, Camera, Check, CheckCircle,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Clipboard,
  Cloud, Code, Copy, CreditCard, Database, Download, Edit, Edit2, Edit3,
  Eye, EyeOff, File, FileText, Filter, Flag, Folder, Grid, Hash, Heart,
  HelpCircle, Home, Image, Info, Key, Layers, Layout, List, Lock, LogOut,
  Mail, Map, MapPin, Maximize, Menu, MessageCircle, MessageSquare, Minus,
  Monitor, Moon, MoreHorizontal, MoreVertical, Package, Paperclip, Phone,
  PieChart, Plus, PlusCircle, Printer, RefreshCw, Save, Search, Send,
  Settings, Share2, Shield, Sliders, Star, Sun, Tablet, Tag, Trash, Trash2,
  TrendingDown, TrendingUp, Upload, User, UserCheck, UserMinus, UserPlus,
  Users, Video, Wifi, X, XCircle, Zap,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptors([errorInterceptorFn])),
    provideRouter(APP_ROUTE),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DirectionService,
    LanguageService,
    { provide: Directionality, useClass: AppDirectionality },
    // Updated ngx-translate v17 configuration
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: './assets/i18n/',
        suffix: '.json',
      }),
    }),
    { provide: MAT_DATE_LOCALE, useValue: enGB },
    { provide: DateAdapter, useClass: DateFnsAdapter },
    appInitializerProviders,
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'yyyy-MM-dd',
        },
        display: {
          dateInput: 'yyyy-MM-dd',
          monthYearLabel: 'yyyy MMM',
          dateA11yLabel: 'PP',
          monthYearA11yLabel: 'yyyy MMM',
        },
      },
    },
    importProvidersFrom(FeatherModule.pick(usedIcons)),
    importProvidersFrom(NgxPermissionsModule.forRoot()),
    provideCharts(withDefaultRegisterables()),
    provideAnimationsAsync(),
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        ...new MatDialogConfig(),
        autoFocus: false,
      } as MatDialogConfig,
    },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
