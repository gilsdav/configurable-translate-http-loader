import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ReplaySubject } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

/**
 * Wait for localesPathSubject before translate.
 *
 * Exemple : `ConfigurableTranslateHttpLoader.localesPathSubject.next('http://localhost:4200/assets/locales/')`.
*/
export class ConfigurableTranslateHttpLoader extends TranslateHttpLoader {

    public static localesPathSubject = new ReplaySubject<string>(1);

    public getTranslation(lang: string) {
        return ConfigurableTranslateHttpLoader.localesPathSubject.pipe(
            take(1),
            tap(value => { this.prefix = value; }),
            switchMap(() => super.getTranslation(lang))
        );
    }

}
