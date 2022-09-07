import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { getI18nContextFromRequest, I18nContext } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LanguajeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const i18n = getI18nContextFromRequest(request);

    return next.handle().pipe(
      map((data) => {
        if (i18n.lang === 'en') {
          return data;
        }

        if (Array.isArray(data)) {
          return Array.from(data).map((item) =>
            this.translateModel(item, i18n),
          );
        } else if (typeof data === 'object') {
          return this.translateModel(data, i18n);
        }
      }),
    );
  }

  private translateModel(data: any, i18n: I18nContext) {
    let obj = data;

    Object.entries(data).forEach((item: any) => {
      try {
        obj = {
          ...obj,
          [i18n.translate(`attributes.${item[0]}`, { lang: i18n.lang })]:
            item[1],
        };
        delete obj[item[0]];
      } catch (error) {}
    });

    return obj;
  }
}
