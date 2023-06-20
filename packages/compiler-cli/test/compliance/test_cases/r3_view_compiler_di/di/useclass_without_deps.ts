import {Injectable} from '@angular-classic/core';

@Injectable()
class MyAlternateService {
}

@Injectable({providedIn: 'root', useClass: MyAlternateService})
export class MyService {
}
