import {forwardRef, Injectable} from '@angular-classic/core';

@Injectable({providedIn: 'root', useClass: forwardRef(() => SomeProviderImpl)})
abstract class SomeProvider {
}

@Injectable()
class SomeProviderImpl extends SomeProvider {
}
