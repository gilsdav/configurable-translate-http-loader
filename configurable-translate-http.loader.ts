import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { tap } from 'rxjs/operators/tap';
import { switchMap } from 'rxjs/operators/switchMap';

/**
 * Wait for localesPathSubject before translate.
 *
 * Exemple : `ConfigurableTranslateHttpLoader.localesPathSubject('http://localhost:4200/assets/locales/')`.
*/
export class ConfigurableTranslateHttpLoader extends TranslateHttpLoader {

    public static localesPathSubject = new ReplaySubject<string>();

    public getTranslation(lang: string) {
        return ConfigurableTranslateHttpLoader.localesPathSubject.pipe(
            tap(value => { this.prefix = value; }),
            switchMap(() => super.getTranslation(lang))
        );
    }

}
