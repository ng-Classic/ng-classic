import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
    ];
    const query = [
      { name: '@angular-classic/core', version: '20.1.0', description: 'Angular Classiccore package' },
      { name: '@angular-classic/common', version: '20.1.0', description: 'Angular Classiccommon package' },
      { name: '@angular-classic/material', version: '20.1.5', description: 'Angular Classicmaterial package' },
    ];
    return {heroes, query};
  }
}
