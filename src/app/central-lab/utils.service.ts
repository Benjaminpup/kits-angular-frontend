import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {

    constructor() { }

    titleCase(name: string) {
        if(name) {
            name = name.trim();
            name = name.toLowerCase();
            const nameArr = name.split('');
            nameArr[0] = nameArr[0].toUpperCase();
            return nameArr.join('');
        }
        return name;
    };

    sentenceCase(name: string) {
        if(name) {
            name = name.trim();
            const nameArr = name.split(' ');
            var updateNames = nameArr.map(v => this.titleCase(v));
            return updateNames.join(' ');
        }
        return name;
    };

}